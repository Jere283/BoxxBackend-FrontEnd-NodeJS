const mongoose  = require("mongoose");

const ProductoSchema = new mongoose.Schema({
    nombreprod: {type: String, require: true},
    genero: {type: String, require: true},
    talla: {type: String, require: true},
    imagen: {type: String, require: true},
    precio: {type: Number}
});

module.exports = mongoose.model('producto', ProductoSchema)