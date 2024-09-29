import express from "express";
import { 
    getUser,
    getUserSavedPosts,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.router();

// READ routes to grab information from db
// Grab id and call db with it for query strings
router.get("/:id", verifyToken, getUser);
router.get(":id/savedPosts", verifyToken, getUserSavedPosts)

// UDPATE route
router.patch("/:id/:savedPostId", verifyToken, addRemoveSavedPost)

export default router;