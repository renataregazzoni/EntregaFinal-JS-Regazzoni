//pintar carrito (modifique)
async function pintarCarrito() {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";

  // agregar header 
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
    <h1 class="modal-header-title">Tu carrito</h1>
    <h2 class="modal-header-button">X</h2>
  `;
  modalContainer.append(modalHeader);

  //boton cerrar (modifique)
 
  function btnCerrar() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.style.display = "none";
  }
  const modalButton = document.querySelector(".modal-header-button");
  modalButton.addEventListener("click", btnCerrar);

  //pintar contenido del carrito recorriendo
  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p>$ ${product.precio}</p>
      <span class="restar"> - </span>
      <p>${product.cantidad}</p>
      <span class="sumar"> + </span>
      <p>Sub Total: $ ${product.cantidad * product.precio}</p>
      <span class="delete-product"> ❌ </span>
    `;
    modalContainer.append(carritoContent);


    //boton restar (modifique)
    
    function btnRestar(product) {
      return function () {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        pintarCarrito();
        carritoCounter();
      };
    }

    let restar = carritoContent.querySelector(".restar");
    restar.addEventListener("click", btnRestar(product));


    //boton sumar (modifique)
    
    function btnSumar() {
      return function () {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
        carritoCounter();
      };
    }

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", btnSumar());


    // boton eliminar 
    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id)
    })
  })
    
    //mostrar total 
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar:$ ${total}`;
    modalContainer.append(totalCompra);

    // pinto boton vaciar carrito
    const vaciarCarrito = document.createElement("div");
    vaciarCarrito.className = "boton-vaciar";
    vaciarCarrito.innerHTML = `
   <button id="verCarrito"class="btn-vaciar"> Vaciar carrito</button>
   `;
    totalCompra.append(vaciarCarrito);

    //boton vaciar carrito
    vaciarCarrito.addEventListener("click", () => {
      vaciar();
      pintarCarrito();
      carritoCounter();
      alerta5();
    });

    // pinto boton finalizar compra
    const finalizar = document.createElement("div");
    finalizar.className = "finalizar";
    finalizar.innerHTML = `
     <button class="fin-compra"> Finalizar compra</button>
     `;
    totalCompra.append(finalizar);

    //boton finalizar compra
    finalizar.addEventListener("click", () => {
      carrito.length > 0 ? alerta3() : alerta4();
      vaciar();
      pintarCarrito();
      carritoCounter();
    });
  };

  //boton ver carrito
  verCarrito.addEventListener("click", pintarCarrito);
  
  //funcion vaciar carrito
  const vaciar = () => {
    carrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  //funcion eliminar producto (modifique)
  function eliminarProducto(id) {
    const foundId = carrito.findIndex((element) => element.id === id);
    carrito.splice(foundId, 1);
    saveLocal();
    carritoCounter();
    pintarCarrito();
    toastifyEliminar();
  }

  // funcion mostrar cantidad numero carrito 
  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.reduce((acc, el) => acc + el.cantidad, 0);

    //mando y traigo del ls, pinto cantidad 
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  //(rehice)
  
async function saveLocal() {
  await fetch("guardarCarrito", {
    method: "POST",
    body: JSON.stringify(carrito),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const getData = async () => {
  const response = await fetch("../json/data.json");
  const data = await response.json();
  return data;
};

const initialize = async () => {
  const data = await getData();
  carritoCounter();
};

initialize();



