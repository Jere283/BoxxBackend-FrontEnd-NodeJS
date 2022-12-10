
(() => {
  $.ajax({
    url: "/prod",
    method: "GET",
    dataType: "json",
    success: (res) => {
      crearProductos(res);
    },
    error: (error) => {
      console.error("error en ajax", error);
    }
  });
})();

function crearProductos(res) {
  for (let i = 0; i < res.length; i++) {
    document.getElementById("primeroca").innerHTML += `
      <div class="col btn" ">
      <figure class="figure " >
      <img src="${res[i].imagen}" class="figure-img img-fluid rounded hov shadow" alt="...">
      <figcaption class="figure-caption table-hover">${res[i].nombreprod}-${res[i].genero}</figcaption>
      <figcaption class="figure-caption text-dark">L. ${res[i].precio}</figcaption>
      </figure>
      <div class="modal-footer">
          <button type="button" class="btn btn-dark w-100">Agregar </button>
        </div>
      </div>`;
  }
}


function aumentar() {
  var b = document.getElementById("canti");
  b.value++;
}

function disminuir() {
  var b = document.getElementById("canti");
  if (b.value > 0) {
    b.value--;
  }
}



function modalprod(i, productos) {
  document.getElementById(
    "cuerpo"
  ).innerHTML += `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ordenar</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        
            
        <div id="carouselExampleIndicators" class="carousel slide w-100 translate-midle" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/Hombre/Camisetas/CGH-L-1.webp" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/Hombre/Camisetas/CGH-L-2.webp" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="img/Hombre/Camisetas/CGH-M-2.webp" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      <h1 class="modal-title fs-5" id="exampleModalLabel">${productos[i].nombreprod}</h1>
      <p class="fw-bold fw-2">L.${productos[i].precio}</p>
      
        <div class="container text-start shadow p-3 mb-2 bg-body rounded shadow">
                <div class="row row-cols-2 p-2 ">
                    <div class="col">
                        <span class="align-middle">Talla</span>
                    </div>
                    <div class="col text-end">
                    <select class="form-select w-100 rounded-pill" aria-label="Default select example">
                    <option selected class="text-center">Seleccionar</option>
                    <option value="1" class="text-center">S</option>
                    <option value="2" class="text-center">M</option>
                    <option value="3" class="text-center">L</option>
                    <option value="4" class="text-center">XL</option>
                  </select>
                    </div>
                </div>
            </div>
        <div class="container text-start shadow p-3 mb-2 bg-body rounded">
                <div class="row row-cols-2 p-2 ">
                    <div class="col">
                        <span class="align-middle">Cantidad</span>
                    </div>
                    <div class="col text-end">
                        <div class="btn-group rounded-pill" role="group" aria-label="Basic example">
                            
                            <input class="form-control text-center rounded-pill" type="number" id="canti" onclick="aumentar()" value=0 aria-label="Disabled input example" >
                            
                        </div>
                    </div>
                </div>
            </div>
        <div class="container text-center">
  
</div>
      
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-dark w-100">Agregar a mi Pedido </button>
        </div>
      </div>
    </div>
  </div>`;
}

/*/function Longitud() {
    alert(categorias.length + " " + categorias[0].nombreCategoria);
    
}/*/
