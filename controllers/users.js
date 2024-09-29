import User from "../models/User";
import Post from "../models/Post";

//  READ
export const getUser = async (req, res) => {
    try{
        // Get ID from request params
        const { id } = req.params;
        // find the user
        const user = await User.findById(id);
        // Send data to the frontend
        res.status(200).json(user);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserSavedPosts = async (req, res) => 
{
    try
    {
        // Get ID from request parameters
        const { id } = req.params;
        // Find the user by the ID
        const user = await User.findById(id);

        // get all the saved posts by the id
        const savedPosts = await Promise.all(
            user.savedPosts.map((id) => Post.findById(id))
        )

        // Format the saved posts to send to the frontend
        const formattedPosts = savedPosts.map(
            ({_id, firstName, lastName, location, description, userPicturePath, picturePath, upvotes, comments }) =>
            {
                return { _id, firstName, lastName, location, description, userPicturePath, picturePath, upvotes, comments };
            }
        );

        // Send formmated post data to the frontend
        res.status(200).json(formattedPosts);

    } catch(err) {
        res.status(404).json({ message: err.message })
    }
};

// UPDATE
export const addRemoveSavedPost = async (req, res) => {
    try {
        // Get the user's id and the post's id from the request parameters
        const { id, postId} = req.params;
        // Find the user
        const user = await User.findById(id);
        // Find the post
        const post = await Post.findById(postId);

        // If the post is already in the saved posts, then remove it from the user's saved posts
        if (user.savedPosts.includes(postId)) 
        {
            // Remove from user's saved posts
            user.savedPosts = user.savedPosts.filter((id) => id !== postId);
        }
        // If it is not in the saved posts, then add it to the user's saved posts        
        else
        {
            // Add to user's saved posts
            user.savedPosts.push(postId);
        }
        // Save the changes
        await user.save();

        // get all the remaining saved posts by the id
        const remainingSavedPosts = await Promise.all(
            user.remainingSavedPosts.map((id) => Post.findById(id))
        )

        // Format the saved posts to send to the frontend
        const formattedPosts = remainingSavedPosts.map(
            ({userId, firstName, lastName, heading, location, description, userPicturePath, picturePath, upvotes, comments }) =>
            {
                return { userId, firstName, lastName, heading, location, description, userPicturePath, picturePath, upvotes, comments };
            }
        );

        // Send formmated post data to the frontend
        res.status(200).json(formattedPosts);
    } 
    catch(err) 
    {
        res.status(404).json({ message: err.message })
    }
}
