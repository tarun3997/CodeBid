require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require('path');

async function ProfileController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const userProfile = await global.prisma.profile.findUnique({
            where:{
                profile_id: claims.id
            }
        })
        if(userProfile){
            const {password, ...data} = await userProfile
            const imageName = data.profileUrl;
            res.sendFile(`E:/Tarun Document/Projects/CodeBid/server/profileImages/${imageName}`);
        }
    }catch(e){
        return res.status(401).send({message: 'unauthenticated'})
    }

}
module.exports = ProfileController