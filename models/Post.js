import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: "UC Davis",
    },
    description: String,
    userPicturePath: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Map,
        of: Boolean,
    },
    comments: 
    {
        type: Array,
        default: [],
    },
    lostOrFound: 
    {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema)

export default Post;