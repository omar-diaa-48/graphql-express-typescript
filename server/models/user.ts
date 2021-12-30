import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, function(err, salt:string) {
        bcrypt.hash(user.password, salt, function(err, hash:string) {
            if(err){
                return next(err)
            }

            user.password = hash;
            next();
        });
    });
})

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

export default mongoose.model('user', UserSchema);