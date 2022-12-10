const mongoose  = require("mongoose");

const PedidosSchema = new mongoose.Schema({
    productos: {type: Array()},
    entregado: {type: Boolean},
    total: {type: Number, required: true},
    id_repartidor: {type: String}    
});



module.exports = mongoose.model('pedidos',PedidosSchema);