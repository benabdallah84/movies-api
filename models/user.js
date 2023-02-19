const mongoose=require('mongoose');
const ModelSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlenght:50
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    watchList:[
       { 
        movie:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Movie'
            },
        watched: Boolean
       }
        
    ],
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});
ModelSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: (document, returnedObject) => {
        delete returnedObject.id
    }
})
const Model=mongoose.model('User',ModelSchema);
module.exports=Model;