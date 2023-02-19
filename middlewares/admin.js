const User = require('../models/user');

exports.check = async (req,res,next) => {
    //console.log(req.userId)
    const user = await User.findById(req.userId);
    console.log("name: ",user.name,"is_admin: ",user.isAdmin)
    user.isAdmin ? next() : res.status(403).json({message: 'Forbidden'});
}
