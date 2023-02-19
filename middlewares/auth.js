const jwtHelpers = require('../util/jwtHelpers');

exports.check = (req,res,next)=>{
    let token = req.headers['authorization'];
    token = token?.replace('Bearer ', '')?.trim();//token.split(' ')[1];

    const payload = jwtHelpers.verify(token);

    if(payload){
        req.userId = payload.sub;
        return next();
    }
    return res.status(401).json({message: 'Unauthorized'});
}

        
