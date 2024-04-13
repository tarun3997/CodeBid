const jwt = require('jsonwebtoken')
require('dotenv').config()
async function postLikeController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const like = await global.prisma.likes.findFirst({
            where: {
                userId: claims.id,
                projectId: req.body.projectId
            }
        });
        if (like) {
            await global.prisma.likes.delete({
                where: {
                    userId_projectId: {
                        userId: claims.id,
                        projectId: req.body.projectId
                      }
                }
            });
            return res.status(200).json({ message: 'Unliked successfully' });
        }else {
            await global.prisma.likes.create({
                data: {
                    userId: claims.id,
                    projectId: req.body.projectId
                }
            });
            return res.status(201).json({ message: 'Liked successfully' });
        }
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function postCommentsController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const comment = await global.prisma.comment.create({
            data:{
            userId: claims.id,
            projectId: req.body.projectId,
            content: req.body.content
            }
        })
        
        res.status(201).json(comment)
    }catch(e){
        console.log(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deletePostController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const user = await prisma.user.findUnique({
            where: {
                id: claims.id,
            },
            select: {
                role: true,
            },
        });


        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isAdmin = user.role === 'ADMIN';
        const projectId = req.body.projectId;
        const isAuthorized = isAdmin || await prisma.project.findFirst({
            where: {
                project_id: projectId,
                creatorId: claims.id,
            },
        });
        if(!isAuthorized){
            return res.status(403).send({ message: 'Unauthorized' });
        }

        const deletePost = await global.prisma.project.delete({
            where: {
                project_id: projectId,
            },
        });
        res.json(deletePost)
   
    }catch(e){
        console.log(e)
        res.status(500).send({ message:'Error occurred while deleting post' });
    }
}
async function updatePostController(req, res){
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const user = await prisma.user.findUnique({
            where: {
                id: claims.id,
            },
            select: {
                role: true,
            },
        });


        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isAdmin = user.role === 'ADMIN';
        const {projectId, title , description, postLocation} = req.body;
        const isAuthorized = isAdmin || await prisma.project.findFirst({
            where: {
                project_id: projectId,
                creatorId: claims.id,
            },
        });
        if(!isAuthorized){
            return res.status(403).send({ message: 'Unauthorized' });
        }

        const updatePost = await global.prisma.project.update({
            where: {
                project_id: projectId,
            },
            data: {
                title: title,
                description: description,
                postLocation: postLocation,
              },
        });
        // console.log(updatePost)
        res.json(updatePost)
   
    }catch(e){
        console.log(e)
        res.status(500).send({ message:'Error occurred while deleting post' });
    }
}

module.exports = {postLikeController, postCommentsController, deletePostController, updatePostController};
