const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Repartidor = require('../models/repartidor');
const bodyParser = require('body-parser');

router.get("/", function(req,res){
    Repartidor.find({},{_id:true, uname:true})

    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send("error en repartidor router",error);
        res.end();
    });
});

router.post('/register', function (req, res) {
    const {name, lname, uname, psw} = req.body;

    const repartidor = new Repartidor({name, lname, uname, psw ,aprobado: false, pedidos:[]});

    repartidor.save(err=>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR USUARIO');
        }else{
            res.status(200).send('USUARIO REGISTRADO');
        }
    });
})

router.post('/authenticate', (req, res) =>{
    const{uname, psw} = req.body;

    Repartidor.findOne({uname}, (err, repartidor) =>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR USUARIO');
        }else if(!repartidor){
            res.status(500).send('No hay usuario');
        }else{
            repartidor.isCorrectPsw(psw, (err, result)=>{
                if(err){
                    res.status(500).send(`ERROR AL AUTENTICAR USUARIO ${err}`);
                }else if(result){
                    req.repartidor = {
                        id: repartidor._id,
                        name: repartidor.name,
                        uname: repartidor.uname,
                        lname: repartidor.lname,
                    }

                    req.session.repartidorId = req.repartidor.id;
                    console.log(req.session);

                    res.render('pages/profile.ejs',{
                        names:repartidor.uname,
                        correo:repartidor.correo
                    });
                    //res.status(200).send(`Hola ${user}. Tu usuario fue autenticado`);
                }else{
                    res.status(500).redirect("/login_r.html");
                }

            });
        }
    });
});

router.get('/profile', function(req,res,next){
    if (req.session){
        User.findOne({id:req.session.userId}, (err, data)=>{
            console.log(data);
            if(!data){
                res.redirect('/')
            }else{
                res.render('pages/profile.ejs',{
                    names:data.uname
                });
            }
        })
    }
    else{
        res.redirect("/login_r.html");
    }
});

router.get('/logout', function (req,res,next){
    
    if(req.session) {
        req.session.destroy((err)=>{
            console.error(err)
        });
        
        console.log('logout', req.session)
        res.redirect('/')
    }
});


module.exports = router;