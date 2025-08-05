const jwt  = require("jsonwebtoken");
const User = require("../models/User");


const getUserDetails = async(req,res) => {
    try {   
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        let payload = jwt.decode(token);

        let user = await User.findById(payload.id);

        if (!user) {
            return res.status(500).json({
                status: false,
                message:"User not found"
            });
        }
        
        return res.status(200).json({
            status: true,
            username: user.username,
            profile: user.profilePhoto
        });
    }
    catch(err){
        console.log(err);
        return res.status(200).json({
            status: false,
            message:"Something went wrong!"
        });
    }
}

module.exports = {
    getUserDetails
}