const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bodyParser = require('body-parser');





router.get("/", function(req,res){
    User.find({},{_id:true, uname:true})

    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send("error en user router",error);
        res.end();
    });
});

router.post('/registerr', function (req, res) {
    const {name, lname, uname, psw} = req.body;

    const user = new User({name, lname, uname, psw});

    user.save(err=>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR USUARIO');
        }else{
            res.status(200).send('USUARIO REGISTRADO');
        }
    });
})

router.post('/authenticate', (req, res) =>{
    const{uname, psw} = req.body;

    User.findOne({uname}, (err, user) =>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR USUARIO');
        }else if(!user){
            
        }else{
            user.isCorrectPsw(psw, (err, result)=>{
                if(err){
                    res.status(500).send(`ERROR AL AUTENTICAR USUARIO ${err}`);
                }else if(result){
                    req.user = {
                        id: user._id,
                        name: user.name,
                        uname: user.uname,
                        lname: user.lname,
                    }

                    req.session.userId = req.user.id;
                    console.log(req.session);

                    res.render('pages/profile.ejs',{
                        names:user.uname
                    });
                    //res.status(200).send(`Hola ${user}. Tu usuario fue autenticado`);
                }else{
                    res.status(500).redirect("/login.html");
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
        res.redirect('/login.html')
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

