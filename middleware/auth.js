import jwt from 'jsonwebtoken';

export const verifyToken = async (req , res, next) => 
{
    try {
        // Grab token set by front end
        let token = req.header("Authorization");
        
        // If no token, deny access to the page
        if(!token)
        {
            return res.status(403).send("Access Denied");   
        }

        // Remove Bearer in the token
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token is valid
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
   
        // Proceed to next function
        next();

    } catch (err)
    {
        res.status(500).json({ error: err.message })
    }
}