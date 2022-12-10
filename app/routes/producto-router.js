const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Producto = require('../models/productos')

router.get("/", function(req,res){
    Producto.find({},{})

    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send("error en repartidor router",error);
        res.end();
    });
});

module.exports = router;
