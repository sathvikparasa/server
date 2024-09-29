import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// Controller functions
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers.posts.js";
import { verifyToken } from "./middleware/auth.js";

/* Configurations */
const __filename = fileURLToPath(import.meta.url);                          // So we can grab file url                       
const __dirname = path.dirname(__filename);                                 // Because we used type: "module"
dotenv.config();                    
const app = express();                                                      // To invoke express app             
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));                                 
app.use(bodyParser.json({ limit: "30mb", extended: true }));                // 30mb just so we dont have any issues
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());                                                            // Invokes cross origin resource sharing policies
app.use("assets", express.static(path.join(__dirname, 'public/assets')));   // Set the directory of where we keep assets (stored locally)

//  File storage config from multer GitHub repo
const storage = multer.diskStorage({
    destination: function (req, file, cb) 
    {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register);             // Middleware function before registering user
app.post("/posts", verifyToken, upload.single("picture"), createPosts)

// Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// Mongoose setup to connect to MongoDB database
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error}, did not connect.`));