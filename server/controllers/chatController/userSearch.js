const jwt = require("jsonwebtoken");
require("dotenv").config();

const searchUser= async(req, res)=>{
    try{
        const cookie = req.get('authToken');
        const claims = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET);
        if (!claims) {
            return res.status(401).send({ message: "unauthenticated" });
          }
          const {user} = req.query;
        const users = await global.prisma.user.findMany({
            where:{
                username:{
                    startsWith:user
                }
            },
            select:{
                id:true,
                username:true,
                Profile:{
                    select:{
                        name:true,
                    profileUrl:true
                    }
                }
            },
            orderBy:{
                username: 'asc'
            }
        });
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
          }     

          const formatedUser = users.map(user=>({
            id: user.id,
            username: user.username,
            name: user.Profile.name,
            profileUrl: `/profileImages/${user.Profile.profileUrl}`
          })) 
          res.status(200).send(formatedUser);
    }catch (error) {
        console.error('Error searching for user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = searchUser