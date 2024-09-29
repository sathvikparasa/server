import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
// Get all the posts in the db (no sorting, no algorithm, sorry aggieworks)
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts)

// Update
router.patch("/:id/like", verifyToken, likePost);

export default router;