const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name: {type: String, require: true},
    lname: {type: String, require: true},
    uname: {type: String, required: true, unique:true},
    psw: {type: String, required: true},
});

AdminSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;

        bcrypt.hash(document.psw, 10, (err, hashedPasword)=>{
            if(err){
                next(err);
            }else{
                document.psw = hashedPasword;
                next();
            }
        })
    }else{
        next();
    }
});

AdminSchema.methods.isCorrectPsw = function(psw, callback) {
    
    bcrypt.compare(psw, this.psw, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }

    });
}

module.exports = mongoose.model('user-admin',AdminSchema);