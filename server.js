const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require('cookie-parser')

const port = 8888;
const unDia = 100 * 60 * 60 * 24;

const userApi = require("./app/routes/user-router");
const producto= require("./app/routes/producto-router")
const repartidoApi = require("./app/routes/repartidor-router")
const pedidoApi =require('./app/routes/pedidos-router')

const app = express();

app.set('view engine','ejs');

app.use(sessions({
    secret: "thisismysecretkey60221408",
    saveUninitialized: true,
    cookie: {maxAge: unDia},
    resave: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//app.use(express.static(path.join(__dirname, 'public/frontend')));
app.use(express.static('public/frontend'));
app.use('/user',userApi);
app.use('/rep',repartidoApi);
app.use("/prod",producto);
app.use("/ped",pedidoApi);

const dbConfig = require('./app/config/db.config');

mongoose.connect(`mongodb+srv://jere283:23082002@cluster0.z5g23jc.mongodb.net/boxx_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Se connecto a MongoDB.");
})
.catch(err => {
    console.error("Error de conexion", err);
    process.exit();
});




app.listen(port, () => console.log(`El servidor esta corriendo en ${port}!`));

