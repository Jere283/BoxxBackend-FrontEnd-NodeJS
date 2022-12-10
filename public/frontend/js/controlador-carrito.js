let carrito=$('#carrito-compras');

function gid(id){
    let obj=document.getElementById(`${id}`);
    return obj;
}

let compras=[
    {
        id:5555,
        name:"Camisa Nike",
        precio:250,
        stock:25,
        cantidad:2,
        talla:"L"
    },
    {
        id:5556,
        name:"Camisa Nike",
        precio:350,
        stock:25,
        cantidad:2,
        talla:"L"
    }
]

let productos=[
    {
        _id: 5555,
        name:"Camisa Nike",
        precio:250,
        stock:25,
        cantidad:2,
        talla:"L"
    },
    {
        _id: 5556,
        name:"Camisa Nike",
        precio:260,
        stock:25,
        cantidad:2,
        talla:"L"
    }
]
let comprass="";
function carritocompras(produ){
    var con=0;
    var subtotal=0;
    $.each(compras, function (i, item) {
        con++;
        subtotal+=item.precio;
        var row=`
        <div class="col mb-1">
            <div class="card">
                <div class="card-body">
                    <div class="row row-cols-2 border-bottom pb-3" >
                        <div class="col col-3">
                            <img src="img/Hombre/Camisetas/CGH-L-1.webp" class="img-fluid" alt="...">
                        </div>
                        <div class="col col-9">
                            <h5 class="card-title mb-0">Boxx</h5>
                            <p class="card-text mb-0">${item.name}</p>
                            <p class="card-text mb-0">L.${item.precio}</p>
                            <p class="card-text mb-0">Talla:${item.talla}</p>
                            <select class="form-select rounded-pill w-50" aria-label="Default select example" width="25px">
                                <option selected>${item.cantidad}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                              </select>


                        </div>
                    </div>
                    <div class="d-grid gap-2 mt-3">
                        <button class="btn btn-danger" type="button" onclick="carritocompras()">Eliminar</button>
                      </div>
                </div>
              </div>
          </div>
        `
    comprass+=item.id;
    carrito.append(row);
        });
    console.log(con);
    gid('subtotal').innerHTML=`subtotal(${con} items): <h1>L.${subtotal}</h1>`;
}

carritocompras(productos);