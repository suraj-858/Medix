const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) =>{

   const authHeader = req.header('auth-token')
   console.log(authHeader);
   
   if(!authHeader?.startsWith('Bearer ')){
    return res.status(401).json({message: "Unauthorized hello"})
   }

   const token = authHeader.split(' ')[1]
   console.log(token);

   jwt.verify(
    token, 
    process.env.ACCESS_TOKEN_SECRET, 
    (err, decoded) =>{
        if(err) return res.status(403).json({err, message: 'Forbidden vayo k mugi'})
        req.user = decoded

        next();
    }
   )
}

module.exports  = verifyJWT;