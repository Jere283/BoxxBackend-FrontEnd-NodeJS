const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');

const RepartidorSchema = new mongoose.Schema({
    name: {type: String, require: true},
    lname: {type: String, require: true},
    uname: {type: String, required: true, unique:true},
    psw: {type: String, required: true},
    aprobado:{type: Boolean},
    pedidos:{type: Array}     
});

RepartidorSchema.pre('save', function(next){
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

RepartidorSchema.methods.isCorrectPsw = function(psw, callback) {
    
    bcrypt.compare(psw, this.psw, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }

    });
}

module.exports = mongoose.model('repartidores',RepartidorSchema);