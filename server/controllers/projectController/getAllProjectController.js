const getAllProjects= async(req, res)=>{
    try{
        const getProject = await global.prisma.project.findMany({
            include: {
                creator: {
                    select: {
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
                comments: true,
                ratings: true,
                PostImage: true
            }
        })

        const filterProject = getProject.map(project =>{
            return {
                title: project.title,
                description: project.description,
                project_Price: project.project_Price,
                isPaid: project.isPaid,
                views: project.views,
                username: project.creator.username,
                name: project.creator.Profile.name,
                profileUrl: `/profileImages/${project.creator.Profile.profileUrl}`,
                location: project.creator.Profile.location,
                PostImage: project.PostImage[0],
            }
        })
        res.json({getProject : filterProject})
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in fetching project'})
    }
}

module.exports = getAllProjects