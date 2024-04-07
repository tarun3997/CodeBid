const jwt = require('jsonwebtoken')
require('dotenv').config()
async function likeNotification(req,res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            return res.status(401).send({ message: "unauthenticated" });
          }
          if(claims.id !== req.body.receiver){
          const alreadyNotify = await global.prisma.notification.findFirst({
            where:{
              senderId: claims.id,
              receiverId: req.body.receiver,
              postId: req.body.postId
            }
          })
          if(!alreadyNotify){
          const user = await global.prisma.user.findUnique({
            where:{ 
              id: claims.id
            },
            select:{
              username: true
            }
          })
          const notification = await global.prisma.notification.create({
            data:{
              senderId: claims.id,
                receiverId: req.body.receiver,
                type: 'Like',
                postId: req.body.postId,
                content: `${user.username} liked your post.`
            }
          }) 
          // console.log(notification)
          res.status(201).json(notification);
        }
      }
    }catch(e){
        console.log(e)
        res.status(500).send({ message:'Error occurred while sending data' });
    }
}

async function commetnNotification(req,res){
  try{
    const cookie = req.get('authToken')
    const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
    if (!claims) {
        return res.status(401).send({ message: "unauthenticated" });
      }
      if(claims !== req.body.receiver){
        const user = await global.prisma.user.findUnique({
          where:{ 
            id: claims.id
          },
          select:{
            username: true
          }
        })
          const notification = await global.prisma.notification.create({
            data:{
              senderId: claims.id,
                receiverId: req.body.receiver,
                type: 'Comment',
                postId: req.body.postId,
                content: `${user.username} commented: ${req.body.comment}`
            }
          }) 
          console.log(notification)
      res.status(201).json(notification);
    }}catch(e){
      console.log(e)
      res.status(500).send({ message:'Error occurred while sending data' });
    }
}

module.exports = {likeNotification, commetnNotification}