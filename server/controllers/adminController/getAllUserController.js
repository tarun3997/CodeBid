const jwt = require('jsonwebtoken')
require('dotenv').config()
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
                OR: [
                    { role: 'USER' },
                    { role: 'ADMIN' }
                ]
            },
            select: {
                id: true,
                email: true,
                role: true,
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
                id: user.id,
                name: user.Profile.name,
                email: user.email,
                username: user.username,
                number: user.mobile_number,
                location: user.Profile.location,
                profileUrl: user.Profile.profileUrl,
                createdAt: formattedDate,
                role:user.role
            };
        });
        res.json({ userList : filterUserList});
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in fetching user List'})
    }
}

async function deleteUser(req, res){
    
    try{
        const deleteUser = await global.prisma.user.delete({
            where:{
                email: req.body.email
            }
        })
        console.log(deleteUser)
        res.json(deleteUser)
    }catch(e){
        console.log(e)
        res.send({message:'Getting error in deleting user',e})

    }
}
async function makeAdmin(req, res){
    
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
        if (user.role !== 'SuperAdmin') {
            return res.status(403).send({ message: 'Unauthorized' });
          }
        const admin = await global.prisma.user.update({
            where: {
              id: req.body.id
            },
            data: {
              role: req.body.role // Assuming you're updating the role to 'ADMIN'
            }
          });
          res.json(admin);
    }catch(e){
        console.error('Error in makeAdmin:', e);
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


module.exports = {getAllUserCount, getAllUser,getUsersAddedToday, deleteUser, makeAdmin};