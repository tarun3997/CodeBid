require('dotenv').config()
const jwt = require('jsonwebtoken')
const path = require('path');

async function getUserProfile(req, res) {
    try {
        const cookie = req.get('authToken');
        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }
        
        const { username } = req.params;
        let userProfile;
        if (username) {
            userProfile = await global.prisma.user.findUnique({
                where: {
                    username: username
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
                    followers: {
                        select: {
                            followerId: true
                        }
                    },
                    following: {
                        select: {
                            followingId: true
                        }
                    }
                }
            });
        } else {
            userProfile = await global.prisma.user.findUnique({
                where: {
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
                    followers: {
                        select: {
                            followerId: true
                        }
                    },
                    following: {
                        select: {
                            followingId: true
                        }
                    }
                }
            });
        }
        if(userProfile){
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
            totalFollower: userProfile.followers.length,
            totalFollowing : userProfile.following.length
        };
        // console.log(filterUserList)
        res.json({ userProfile: filterUserList });
    }
    else{
        res.send({message: 'User Not Found'})
    }
    } catch (e) {
        console.log(e);
        return res.status(401).send({ message: 'unauthenticated' });
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
module.exports = {getUserProfile, isUserIsAdmin}