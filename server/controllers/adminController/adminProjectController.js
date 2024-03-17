async function getTotalProject(req, res){
    try{
        const projects = await global.prisma.project.count()
        res.json({projects})
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in fetching user'})
    }
}

module.exports = {getTotalProject}