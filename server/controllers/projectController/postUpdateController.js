const jwt = require('jsonwebtoken')
require('dotenv').config()
async function postLikeController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const user = await global.prisma.user.findUnique({
            where:{
                id: claims.id
            }
        })
        if(user){
            const like = await global.prisma.like.create({
                data: {
                    userId: claims.id,
                    projectId: req.body.projectId
                  }
            })
            res.status(201).json(like);
        }
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = postLikeController