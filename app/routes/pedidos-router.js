const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/pedidos');
const bodyParser = require('body-parser');





router.get("/", function(req,res){
    User.find()

    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send("error en pedidos router",error);
        res.end();
    });
});

router.post('/crear', function (req, res) {
    const {productos,entregado , total, id_repartidor} = req.body;

    const user = new User({productos, entregado, total, id_repartidor});

    user.save(err=>{
        if(err){
            res.status(500).send('ERROR AL PROCESAR PEDIDO');
        }else{
            res.status(200).send('USUARIO REGISTRADO');
        }
    });
})





module.exports = router;

