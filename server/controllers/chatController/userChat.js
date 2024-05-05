const jwt = require('jsonwebtoken')
require('dotenv').config()
const userChat =async(req,res)=>{
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }

        const { receivedId } = req.params;
        const messages = await global.prisma.message.findMany({
            where:{
                OR: [
                    { senderId: claims.id, receiverId: receivedId },
                    { senderId: receivedId, receiverId: claims.id }
                ]
            },
            orderBy:{
                createdAt: 'asc'
            },
            include:{
                sender:{
                    select:{
                        id:true,
                        Profile:{
                            select:{
                                profileUrl:true
                            }
                        }
                    }
                },
                receiver:{
                    select:{
                        id:true,
                        Profile:{
                            select:{
                                name:true,
                                profileUrl:true
                            }
                        }
                    }
                }
            }
        })
        const formattedMessages = messages.map(message => ({
            id: message.id,
            text: message.text,
            senderId: message.senderId,
            receiverId: message.receiverId,
            createdAt: message.createdAt,
            senderProfile: `/profileImages/${message.sender.Profile.profileUrl}`,
            receiverName: message.receiver.Profile.name,
            receiverProfile: `/profileImages/${message.receiver.Profile.profileUrl}`,
            sendBy: message.senderId === claims.id ? true : false
        }));
        // console.log(formattedMessages)
        res.status(200).send(formattedMessages);

    }catch(e){
        console.error("Error fetching user chat:", e);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = userChat