
const jwt = require('jsonwebtoken');
const secret = process.env.MY_jwtSecret;

//middleware will have (next) to move on to next middleware
module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        //401: unauthorized
        return res.status(401).json({ msg: 'No token, authorization denied'})
    }
    //Check if token need to verify
    try{
        const decoded = jwt.verify(token, secret);
        //pull out the user from payload, to get access 
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg:'Token is not valid' });
    }

}