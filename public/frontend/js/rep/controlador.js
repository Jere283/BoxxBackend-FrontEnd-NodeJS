
function $(ID) {
  let elemento=document.getElementById(`${ID}`);
  return elemento;
}
//nombre del menu
let nmenu=$("nombre-menu");
//imagen del menu
let imenu=$("img-menu");
//alerta login
let alerta=$("alerta-login");
//div de pedidos disponibles
let pedidos=$("pedidos-disponibles");
//titulo modal pedidos
let titmp=$("titulo-pedido");
let clp=$("clp");
let pcl=$('pcl');
let ccl=$('ccl');
let dcl=$('dcl');
let ncl=$('ncl');
let pedidoactual;
//Variables de Entregas
  //Ganancias Div
let gn=$('gn');
//Estrellas Div
let estre=$('estrellas');
//Comentarios Div
let comenta=$('comentarios');
let alertas={
  contraseña: "Rellene el campo de su contraseña",
  incorrecto: "Datos incorrectos, contraseña o usuario incorrectos",
  correo: "Rellene el campo de su correo",
  vacio: "Porfavor rellene los campos"
}

let usuarios = {
  
      id:1,
      nombre:"Pedro",
      apellido:"Martinez",
      contraseña: "Pedro1225",
      email: "Pedromartin@gmail.com",
      img: "profile-pics/androide_16.jpg",
      ganancias: 155,
      estrellas: 5,
      comentarios: 20
      
  
};


let pedidosdis = [
  {
      id:1,
      pago: 75,
      totalcliente: 225,
      direccion: "Universidad Nacional Autonoma de Honduras",
      ncliente:"Jeremy",
      acliente:"Figueroa",
      fecha: "2022/12/5 22:42:00",
      estado: "pendiente",
      numcliente: "95030321",
      productos:[
          {
              nombreProducto:"Camisa Adidas",
              descripcion: "Camisa Adidas Negra Talla L",
              cantidad:2,
              precio:50
          },
          {
              nombreProducto:"Camisa Nike",
              descripcion: "Camisa Adidas Blanca Talla L",
              cantidad:1,
              precio:50
          }
      ]
  },
  {
    id:2,
    pago: 80,
    totalcliente: 350,
    direccion: "Colonia Primero de Mayo",
    ncliente:"Fernando",
    acliente:"Figueroa",
    fecha: "2022/12/5 22:47:00",
    estado: "pendiente",
    numcliente: "89654521",
    productos:[
        {
            nombreProducto:"Camisa Adidas",
            descripcion: "Camisa Adidas Negra Talla L",
            cantidad:2,
            precio:50
        },
        {
            nombreProducto:"Camisa Nike",
            descripcion: "Camisa Adidas Blanca Talla L",
            cantidad:1,
            precio:50
        }
    ]
}
];

//OCULTAR ELEMENTOS
function esconder(ID){
  let elemento=document.getElementById(`${ID}`);
  elemento.style.display = "none";
}

//APARECER ELEMENTOS
function aparecer(ID){
  let elemento=document.getElementById(`${ID}`);
  elemento.style.display = "block";
}

//ocultar alerta al escribir
function ocultaralerta() {
  esconder("alerta-login");
  
}

function inciarsesion() {
  let email=$("email").value;
  let password=$("password").value;
  if (email=="" && password=="") {
    alerta.innerHTML=alertas.vacio;
    aparecer("alerta-login");
  } else if(email=="" && password!=""){
    alerta.innerHTML=alertas.correo;
    aparecer("alerta-login");
  } else if(email!="" && password==""){
    alerta.innerHTML=alertas.contraseña;
    aparecer("alerta-login");
  } else{
    alert("campos llenos");
    comprobarusuarios(email, password);
  }
}

function calcularDiferenciaHoras(fecha2) {
  let fecha1=new Date();
  if (!(fecha1 instanceof Date) || !(fecha2 instanceof Date)) {
      throw TypeError('Ambos argumentos deben ser objetos de tipo fecha (Date).');
  }

  let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000;
  diferencia /= (60);

  return Math.abs(Math.round(diferencia));
}

function comprobarusuarios(email, password){
  if (usuarios.email==email ) {

    alert("Sesion iniciada");
    location.replace('Repartidores.html');
    llenarcamposmenu();
    
  }
}
  
function llenarcamposmenu(){
  nmenu.innerHTML=`${usuarios.nombre} ${usuarios.apellido}`;
  imenu.src=usuarios.img;
}

//Llenar Informacion de los pedidos
function llenarinfo(){
  llenarcamposmenu();
  llenarpedidos();
}

//llenar informaciones de entregas
function llenarinfoe(){
  llenarcamposmenu();
  llenarinfoentregas();
}

function llenarinfoentregas(){
  gn.innerHTML=usuarios.ganancias;
  estre.innerHTML=usuarios.estrellas;
  comenta.innerHTML=usuarios.comentarios;


}

function llenarpedidos(){
  $.each(pedidosdis, function (i, item) {
    if (item.estado=="pendiente") {
      var col=`
    <div class="col pb-2" id="p${item.id}">
    <div class="card text-start">
      
      <div class="card-body">
        
        <h5 class="card-title">${item.pago}$</h5>
        <p class="card-text">${item.direccion}</p>
        <div class="container text-center">
          <div class="row row-cols-2">
            <div class="col"><div class="d-grid gap-2">
          
              <button class="btn btn-danger" type="button" id="rp${item.id}">Rechazar Trabajo</button>
            </div></div>
            <div class="col"><div class="d-grid gap-2">
          
              <button class="btn btn-success" type="button" id="bp${item.id}" data-bs-toggle="modal" data-bs-target="#modalpedido">Aceptar Trabajo</button>
            </div></div>
            
          </div>
        </div>
        
      </div>
      <div class="card-footer text-muted">
        Hace ${calcularDiferenciaHoras(new Date(item.fecha))} Minutos a 1.5 Km
      </div>
    </div>
  </div>`;
  $('#pedidos-disponibles').append(col);
    document.getElementById(`rp${item.id}`).addEventListener('click', function(){
        esconder(`p${item.id}`);
      });
      document.getElementById(`bp${item.id}`).addEventListener('click', function(){
        llenarmodalpedido(item);
      });  
      
    }
    
    console.log(item);
    
    });


  }

  function llenarmodalpedido(pedido) {
    pedidoactual=pedido;
    clp.innerHTML=`Cliente: ${pedido.ncliente}`;
    pcl.innerHTML=`Pago del Cliente: ${pedido.totalcliente}`;
    ccl.innerHTML=`Comisión: ${pedido.pago}`; 
    dcl.innerHTML=`Dirección: ${pedido.direccion}`;
    ncl.innerHTML=`Telefono del Cliente: ${pedido.numcliente}`;
    console.log(pedido);
    titmp.innerHTML="Trabajo Aceptado";
    
  }

  function Trabajofin() {
    pedidoactual.estado="entregado";
    console.log(pedidoactual.estado);
    console.log(pedidosdis[0].estado);
    $('#pedidos-disponibles').empty();
    llenarpedidos();


    
  }

function cerrarsesion() {
  location.replace('login.html');
  
}
  
