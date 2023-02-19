const User = require('../models/user');
const jwtHelpers = require('../util/jwtHelpers');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user.isAdmin);
       
    if(user && bcrypt.compareSync(password, user.password)) {

        res.json({
            success: true,
            data:{
                id:user.id,
                name: user.name,
                accessToken: jwtHelpers.sign({ sub: user.id })

            }

        })
    }
    else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}
    // try {
    //     const { email, password } = req.body;
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //         return res.status(401).json({ message: 'Invalid Credentials' });
    //     }
    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ message: 'Invalid Credentials' });
    //     }
    //     const token = jwtHelpers.generateToken(user);
    //     res.status(200).json({ message: 'Login Successful', token });
    // } catch (err) {
    //     res.status(500).json({ message: err.message });
    // }

exports.register = async (req, res) => {
    const { name,email, password } = req.body;
    console.log("name: ",name);

    const user = new User({
        name ,
        email ,
        password: bcrypt.hashSync(password, 8)

    })
    console.log("name: ",user.password);
    try{
        await user.save();

        res.json({
            success: true,
    
        })
    }
    catch(err){
    
        res.status(500).json({ message: 'something went wrong!' });
    }
}
exports.me = async (req, res) => {
    const user = await User.findById(req.userId)
    
    res.json({
        success: true,
        data:{
            id:user.id,
            name: user.name,
            email: user.email,
            
        }

    })
}


