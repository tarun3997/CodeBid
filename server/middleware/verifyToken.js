const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyToken= (req, res, next)=>{
    const token = req.headers.authToken;
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
          }
          req.user = decoded; 
          next();
        });
}
module.exports = verifyToken;
