import Post from "../models/Post.js";
import User from "../models/User.js";

// Create post
export const createPost = async (req, res) =>
{
    try{
        // Get all this information from the front end
        const { userId, heading, location, description, picturePath, lostOrFound } = req.body;
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            lostOrFound,
            heading,
            likes: {},
            comments: {},
        });
        // Save to database
        await newPost.save();

        // Get a list of the updated posts
        const post = await Post.find();
        // Return posts
        res.status(201).json(post)
    } 
    catch(err)
    {
        res.status(409).json({ message: err.message })
    }
}