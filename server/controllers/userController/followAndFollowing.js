const jwt = require('jsonwebtoken')
require('dotenv').config()
async function FollowAndFollowing(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            return res.status(401).send({ message: "unauthenticated" });
          }
        const isFollow = await global.prisma.follow.findFirst({
            where:{
                followerId: req.body.follower,
                followingId: claims.id
            }
        })
        if(isFollow){
            await global.prisma.follow.delete({
                where:{
                    followerId: req.body.follower,
                    followingId: claims.id
                }
            })
            return res.status(200).json({ message: 'Unfollow successfully' });
        }else{
            await global.prisma.follow.create({
                data: {
                    followerId: req.body.follower,
                    followingId: claims.id
                }
            });
            return res.status(201).json({ message: 'Follow successfully' });

        }

    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function GetFollowAndFollowing(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            return res.status(401).send({ message: "unauthenticated" });
          }
          
          const user = await prisma.user.findUnique({
            where: {
                id: claims.id
            },
            include: {
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
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

            const totalFollower = user.followers.length

            const totalFollowing = user.following.length
            
        // console.log(user)
        console.log('follower',totalFollower)
        console.log('following',totalFollowing)
        res.status(200).json({ totalFollower, totalFollowing});
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {FollowAndFollowing, GetFollowAndFollowing}