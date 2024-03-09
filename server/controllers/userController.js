require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {prisma} = require('../db')

async function handelGetUser(req, res){
    try{
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET)
        if(!claims){
            return res.status(401).send({message: 'unauthenticated'})
        }
    
        const user = await global.prisma.user.findUnique({
            where:{
                id: claims.id
            }
        })
        const {password, ...data} = await user
        res.send(data)
    }catch(e){
        return res.status(401).send({message: 'unauthenticated'})
    }
}

module.exports = {handelGetUser};