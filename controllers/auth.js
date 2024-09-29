import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
    try {
        // key value pair of data submitted in request body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
        } = req.body;

        // Encrypt password with salt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        // Create new User
        const newUser = newUser({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            itemsFound,
        });

        // Save new User
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err)
    {
        // If any error is caught then throw an error mensaje 
        res.status(500).json({ error: err.message });
    }
}

// LOGIN  -  Simple auth with bcrypt
export const login = async (req, res) => {
    try{
        // key value pair of data submitted in request body
        const { email, password } = req.body;

        // try to find one user
        const user = await User.findOne({ email: email});
        // if user doesn't exist, return error mensaje
        if (!user)
        {
            return res.status(400).json({ msg: "User does not exist." });
        }

        // use bcrypt to compare password to password showed in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({ msg: "User does not exist." });
        }
        // Create token based on secret jsonwebtoken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // make user pswd inaccessible again
        delete user.password;

        res.status(200).json({ token, user });


    } catch {
        res.status(500).json({ error: err.message })
    }
}