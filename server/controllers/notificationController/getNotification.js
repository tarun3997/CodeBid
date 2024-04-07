const jwt = require('jsonwebtoken')
require('dotenv').config()
async function getNotification(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const response = await global.prisma.notification.findMany({
            where:{
                receiverId: claims.id
            },
            orderBy:{
                timestamp: 'desc'
            },
            include:{
                sender:{
                    select:{
                        username: true,
                        Profile:{
                            select:{
                                profileUrl: true,
                            }
                        },
                    }
                }
            }
        })
        const filterNotification = await Promise.all( response.map(async data=>{
            const postImage = await global.prisma.postImage.findMany({
                where:{
                    projectId: data.postId
                },
                select:{
                    imageUrl: true
                }
            })
            const imageUrls = postImage.map(image => image.imageUrl)
            return {
                type: data.type,
                content: data.content,
                profileUrl: `/profileImages/${data.sender.Profile.profileUrl}`,
                timestamp: data.timestamp,
                postImage: imageUrls[0]
            }
        }))
        // console.log(filterNotification)
        res.json({filterNotification})
    }catch(e){
        console.error('Error fetching notifications:', e);
        return res.status(500).send({ message: 'Internal server error' });

    }
}

module.exports= {getNotification}