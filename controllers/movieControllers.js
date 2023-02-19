const Movie = require('../models/movie');

exports.create = async (req, res, next) => {
    const {name,category, description} = req.body;
    
    const movie = Movie({name, category, description});
    await movie.save()
    res.json({
        success: true,
        data:movie
    });

}
exports.find = async (req,res,next)=>{
    //const {id} = req.params;
    
    const movie = await Movie.findById(req.params.id).select('-reviews');
    if(!movie){
        return res.status(404).send({message: 'movie not found'});
    }
    res.json({
        success: true,
        data:movie
    });
}
    
exports.update = async (req, res, next) => {
    const {id} = req.params;

    const {name,category, description} = req.body
    await Movie.updateOne(
        {_id: id}, 
        {
            $set:{name, category, description}
        })
    res.json({
        success: true,

    });

}
exports.delete = async (req, res, next) => {
    const {id} = req.params;
    await Movie.deleteOne({_id: id});
    
    res.json({
        success: true,

    });

}
exports.list= async (req, res, next) => {
    const page= req?.query?.page || 1
    const limit=  2;
    const skip= (page-1)*limit;
    const movies = await Movie.find().select('-reviews').skip(skip).limit(limit);
    const total = await Movie.countDocuments();
    const pages = Math.ceil(total/limit);
    res.json({
        success: true,
        pages,
        data:movies
       

    });

}
exports.reviews = async (req, res, next) => {
    const {id} = req.params;
    const movie = await Movie.findById(id).select('-reviews._id').populate('reviews.user','name');

    if(!movie){
        return res.status(404).send({message:'movie not found'});

    }

    res.json({
        success: true,
        data:movie.reviews
    })
    
}
exports.addReview = async (req, res, next) => {
    const {id} = req.params;
    const {comment,rate} = req.body;
    //find the movie

    const movie = await Movie.findById(id);
    if(!movie){
        return res.status(404).send({message:'movie not found'});
    }
    //check if the user has already rated the movie
    const isRated = await movie.reviews.findIndex(user => user.id === req.userId);
    if(isRated > -1){
        return res.status(403).send({message:'You have already rated this movie'})
    }
    //compute the new rating
    const totalRate = await movie.reviews.reduce((sum,review)=>sum+review.rate,0);
    const newRate = (totalRate + rate)/(movie.reviews.length+1);
    //update the movie and add the new review
    await movie.updateOne(
        {_id: id},
        {
            $push :{
                reviews: { 
                    user: req.userId,
                    comment,
                    rate
                }
            },
            $set:{
                rate:newRate
            }
        }
    )

    res.status(201).json({
            success: true,
            data:movie
    })
}

