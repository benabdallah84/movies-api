const User = require('../models/user');

exports.add = async (req, res, next) => {
    const {movie, watched}= req.body
    const user = await User.findById(req.userId);
    const index = user.watchList.findIndex(x => x.movie === movie);
    if(index > -1){
        user.watchList[index].watched = watched;
        
    }
    else{
        user.watchList.push({movie, watched});
    }
    await user.save();
    
    res.json({
        success: true,
        data:{
            name:user.name
        }
        
    });

}
exports.delete = async (req,res,next)=>{
    
    const movie = req.params.id;
    
    console.log("movie: ",movie);

    
    const user = await User.findById(req.userId);
    user.watchList = user.watchList.filter(x => x.movie != movie);
    user.watchList.filter(x => x.movie != movie)
    await user.save();
    
    res.json({
        success: true,
        data:{
            watchlist: user.watchList
         
        }
        
    });
}
    
exports.list = async (req, res, next) => {
   const user = await User.findById(req.userId)
   .select('-watchList._id').populate('watchList.movie',['name','category']);
   
   
    res.json({
        success: true,
        data:{
            watchlist: user?.watchList
        }

    });

}

