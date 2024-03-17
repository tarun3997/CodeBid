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
        const userProfile = await global.prisma.user.findUnique({
            where:{
                id: claims.id
            },
            select: {
                email: true,
                username: true,
                mobile_number: true,
                createdAt: true,
                Profile: { 
                  select: {
                    name: true,
                    profileUrl: true,
                    location: true
                  }
                },
              }
        })
        const createdAtDate = new Date(userProfile.createdAt);
        const formattedDate = `${createdAtDate.getDate()}-${createdAtDate.getMonth() + 1}-${createdAtDate.getFullYear()}`;
        const filterUserList = {
            
            name: userProfile.Profile.name,
            email: userProfile.email,
            username: userProfile.username,
            number: userProfile.mobile_number,
            location: userProfile.Profile.location,
            profileUrl: `/profileImages/${userProfile.Profile.profileUrl}`,
            createdAt: formattedDate,
            
        };
        // console.log(filterUserList);
        res.json({ userProfile : filterUserList});
    }catch(e){
        console.log(e)
        return res.status(401).send({message: 'unauthenticated'})
    }

}
async function isUserIsAdmin(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const isUserAdmim = await global.prisma.user.findUnique({
            where:{
                id: claims.id
            }
        })
        if(isUserAdmim){
            const {password, ...data} = await isUserAdmim
            const userRole = data.role
            res.send(userRole)
        }
    }catch(e){
        return res.status(401).send({message: 'unauthenticated'})
    }
}
module.exports = {ProfileController, isUserIsAdmin}