require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {prisma} = require('../db')


async function handelUserLogin(req, res){
    const {email, password } = req.body;

    const user = await global.prisma.user.findUnique({
        where:{
            email: email
        }
    })
    if(!user){
        return res.status(404).send({message: 'User not found'})
    }
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({message: 'Invalid credentials'})
    }

    const token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET)
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
    

    if(user.role==='ADMIN'){
        return res.send({message: 'Admin login success',role:"ADMIN",token});
    }else{
        return res.send({message: 'User login success',role:'USER',token});
    }
}


async function handelUserRegister(req, res){
    // console.log(req.body);
    // console.log(req.file);
    const { name, mobile_number, email, password,location,username } = req.body;
    const profileImageUrl = req.file.filename;
        const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        const user = await global.prisma.user.create({
            data:{
                email: email,
                mobile_number: mobile_number,
                password: hashedPassword,
                username: username,
                Profile:{
                    create:{
                        name: name,
                        profileUrl: profileImageUrl,
                        location: location
                    }
                }
            },
            include:{
                Profile: true
            }
        });
        res.status(201).json(user);

    }catch(e){
        if (e.code === 'P2002' && e.meta.target === 'User_mobile_number_key') {
            return res.status(400).json({ error: "Mobile number is already in use" });
        } else if (e.code === 'P2002' && e.meta.target === 'User_email_key') {
            return res.status(400).json({ error: "Email is already in use" });
        } else {
            console.error(e);
            return res.status(500).json({ error: "Failed to insert user"});
        }
    }

}

async function handelUserLogout(req,res){
    res.clearCookie('jwt');
    res.send({message: 'Logout'})
}

module.exports = {
    handelUserLogin,
    handelUserRegister,
    handelUserLogout
};