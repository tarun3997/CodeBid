
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()


const PostProject = async (req,res)=>{
    const {title,description,project_Price,isPaid} = req.body;

    const imagePaths = req.files.map(file => file.path.replace(/\\/g, '/'));
    try{
            const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const userProfile = await global.prisma.user.findUnique({
            where:{
                id: claims.id
            }
        })
        if(userProfile){

        if (!imagePaths.length) {
            return res.status(400).json({ message: 'No images uploaded' });
          }

        const projects = await global.prisma.project.create({
            data:{
                title: title,
                description: description,
                project_Price: parseFloat(project_Price),
                isPaid: isPaid,
                creatorId: claims.id,
                PostImage:{
                    createMany:{
                        data: imagePaths.map(imagePath => ({imageUrl: imagePath})),
                    }
                }
            }, 
            include:{
                PostImage:true
            } 
        })
        res.status(201).json(projects);
    }
    }catch(e){
        console.log(e)
        return res.send({message: 'Post not uploaded'});
    }
}

module.exports = PostProject