const mongoose  = require("mongoose");

const CategoriasSchema = new mongoose.Schema({
    nombreCategoria: String,
    genero: String,
    portada: String,
    productos: Array

});

module.exports = mongoose.model("categoria", CategoriasSchema)