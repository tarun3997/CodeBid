const jwt = require('jsonwebtoken')
require('dotenv').config()
const userList= async(req, res)=>{
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const messages = await global.prisma.message.findMany({
            where:{
                OR:[
                    { senderId: claims.id },
                    { receiverId: claims.id }
                ]
            },
            select:{
                senderId: true,
                receiverId: true
            }
        });
        const userIds = messages.flatMap(message => [message.senderId, message.receiverId]);
        const uniqueUserIds = [...new Set(userIds.filter(id=> id !== claims.id))];
        const userList = await global.prisma.user.findMany({
            where: {
                id: {
                    in: uniqueUserIds
                },
            },
                select: {
                    id:true,
                    username: true,
                    Profile: { 
                      select: {
                        name: true,
                        profileUrl: true,
                      }
                    },
                  }
            
        })
        const filterUserList = await Promise.all(userList.map(async (user) => {
            if (user.id !== claims.id) {
                return {
                    username: user.username,
                    name: user.Profile.name,
                    id: user.id,
                    profileUrl: `/profileImages/${user.Profile.profileUrl}`,
                };
            }
        }));

        // console.log(filterUserList)
        res.status(200).send(filterUserList);

    }catch(e){  
        console.error("Error fetching user count:", e);
        res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = userList