const jwt = require('jsonwebtoken')
require('dotenv').config()
const getAllProjects= async(req, res)=>{
    try{
        const cookie = req.get('authToken')
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
        const getProject = await global.prisma.project.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            include: {
                
                creator: {
                    select: {
                        id: true,
                        username: true,
                        Profile: {
                            select: {
                                name: true,
                                location: true,
                                profileUrl: true
                            }
                        }
                    }
                },
                likes: true,
                comments: {
                    select:{
                        content: true,
                    }
                },
                ratings: true,
                PostImage: true
            }
        })

        
        const filterProject = await Promise.all(getProject.map(async (project) => {
            const totalLikes = project.likes.length;
            const isLike = await global.prisma.likes.findUnique({
                where: {
                    userId_projectId: {
                        userId: claims.id,
                        projectId: project.project_id
                    }
                }
            });
            const isFollow = await global.prisma.follow.findUnique({
                where:{
                    followerId_followingId: {
                        followerId: project.creator.id,
                        followingId: claims.id
                    }
                }
            })
            const createdAt = new Date(project.createdAt);
            const currentTime = new Date();
            const timeDiff = currentTime - createdAt;
            const seconds = Math.floor(timeDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            let displayTime;
            if(days>=7){
                displayTime = `${Math.floor(days / 7)}w`;
            }else if (days >= 1) {
                displayTime = `${days}d`;
            } else if (hours >= 1) {
                displayTime = `${hours}h`;
            } else {
                displayTime = `${minutes}m`;
            }
            const commentsContent = project.comments.map(comment => comment.content);

            return {
                id: project.creator.id,
                projectId: project.project_id,
                createdAt: displayTime,
                title: project.title,
                description: project.description,
                postLocation: project.postLocation,
                username: project.creator.username,
                name: project.creator.Profile.name,
                profileUrl: `/profileImages/${project.creator.Profile.profileUrl}`,
                location: project.creator.Profile.location,
                PostImage: project.PostImage[0],
                likes: totalLikes,
                isLikes: isLike ? true : false,
                totalComment: commentsContent.length,
                isFollowing: isFollow ? true : false,
                ownPost: claims.id === project.creator.id ? true : false
            }
        }))
        // console.log(filterProject)  
        res.json({getProject : filterProject})
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in fetching project'})
    }
}

module.exports = getAllProjects