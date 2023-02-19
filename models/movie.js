const mongoose=require('mongoose');
const ModelSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        default:0
        
    },
    reviews:{
        type:[
            {
                user: { 
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'   
                },
                comment: String,
                rate: Number
            }
        ],
        default:[]
        
    }
},{
    timestamps:true
});
ModelSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: (document, returnedObject) => {
        delete returnedObject.id //=returnedObject._id.toString();
    // transform: (document, returnedObject) => {
    //     returnedObject.id=returnedObject._id.toString();
    //     delete returnedObject._id;
    //     delete returnedObject.__v;
    // }
}
})
const Model=mongoose.model('Movie',ModelSchema);
module.exports=Model;