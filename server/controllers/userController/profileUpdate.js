const jwt = require('jsonwebtoken')
require('dotenv').config()

async function UpdateUserProfile(req,res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const profileImageUrl = req.file.filename;
        const updateProfile = await global.prisma.profile.update({
            where:{
                profile_id: claims.id
            },
            data:{
                profileUrl: profileImageUrl
            }
        })
         console.log(updateProfile)
         res.json(updateProfile)
    }catch(e){
        console.log(e)
        res.status(500).send({ message:'Error occurred while updating user profile' });
    }
}

module.exports= UpdateUserProfile