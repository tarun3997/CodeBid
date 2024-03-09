const {prisma, Prisma} = require('../../db')

async function getAllUserCount(req, res){
    try{
        const allUser = await global.prisma.user.count({
            where:{
                role: 'USER'
            }
        });
        res.json({allUser})
    }catch(e){
        res.send({message:'Getting error in fetching user'})
    }
}
async function getAllUser(req, res){
    try{
        const userList = await global.prisma.user.findMany({
            where:{
                role: 'USER'
            },
            select: {
                id: true,
                email: true,
                username: true,
                mobile_number: true,
                createdAt: true,
                Profile: { 
                  select: {
                    name: true,
                    profileUrl: true,
                    location: true
                  }
                },
              }
            });

    
        const filterUserList = userList.map(user => {
            const createdAtDate = new Date(user.createdAt);
            const formattedDate = `${createdAtDate.getDate()}-${createdAtDate.getMonth() + 1}-${createdAtDate.getFullYear()}`;
            return {
                
                name: user.Profile.name,
                email: user.email,
                username: user.username,
                number: user.mobile_number,
                location: user.Profile.location,
                profileUrl: user.Profile.profileUrl,
                createdAt: formattedDate,
            };
        });
        res.json({ userList : filterUserList});
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in fetching user List'})
    }
}

async function deleteUser(req, res){
    console.log(req.body)
    try{
        const deleteUser = await global.prisma.user.delete({
            where:{
                email: req.body.email
            }
        })
        res.json(deleteUser)
    }catch(e){
        res.send({message:'Getting error in deleting user',e})

    }
}
async function getUsersAddedToday(req, res){
    try{
        const today = new Date()
        today.setHours(0,0,0,0);
        

        const usersAddedToday = await global.prisma.user.count({
            where:{
                role: 'USER',
                createdAt:{
                    gte: today,
                }
            }
        })
        res.json({usersAddedToday})
    }catch(e){
        res.send({message:'Getting error in fetching new user'})
        console.error('Error fetching users added today:', e);
    }
}

module.exports = {getAllUserCount, getAllUser,getUsersAddedToday, deleteUser};