// declaro constantes y las traigo por id
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const usuario = document.getElementById("usuario");
const btnUser = document.getElementById("btn-user");
// array carrito y/o ls
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Bienvenida (modifique)
function verificarNombreUsuario() {
  const nombreUsuario = JSON.parse(localStorage.getItem("nombre"));

  if (nombreUsuario) {
    usuario.innerHTML = `Usuario: ${nombreUsuario.toUpperCase()}`;
    alerta2(nombreUsuario);
  } else {
    alerta();
  }
}

verificarNombreUsuario();

// boton cambiar usuario (modifique)
btnUser.addEventListener("click", () => {
    const nombreUsuario = JSON.parse(localStorage.getItem("nombre"));
  
    if (nombreUsuario) {
      swal({
        title: "Confirmar",
        text: "¿Estás seguro de que deseas eliminar tu nombre de usuario?",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          localStorage.removeItem("nombre");
          window.location.reload();
        }
      });
    }
  });

  // traigo json de productos y los pinto (modifique)
  document.addEventListener("DOMContentLoaded", obtenerDatosProd);
  async function obtenerDatosProd() {
    try {
      const response = await fetch("../json/data.json");
      const data = await response.json();
  
      data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p class="desc">${product.desc}</p>
          <p class="precio">$${product.precio}</p>`;
           
  
     // agrego boton comprar
     let comprar = document.createElement("button")
         comprar.innerText = "Comprar"
         comprar.className = "comprar"
         content.append(comprar)
         
//(modifique)
function carritoCounter() {
    cantidadCarrito.innerText = carrito.length;
  }
  
// boton comprar
comprar.addEventListener("click", () => {
    toastify()
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++
          saveLocal()
          carritoCounter()
        }
      })
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      })
      saveLocal()
      carritoCounter()
    }
  })

  shopContent.append(content);
});
} catch (err) {
console.log("Error inesperado, decime qué pasó", err);
}
}

//funcion guardar al ls
function saveLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }
  
  //funcion agregar carrito toastify
  function toastify() {
    Toastify({
      text: "Agregado al carrito",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "bottom", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, #00b09b, #09a011e1)",
        borderRadius: "10px",
        justifyContent: "space-between",
      },
      onClick: function () { pintarCarrito() } 
    }).showToast();
  }
  //funcion eliminar del carrito toastify
  function toastifyEliminar() {
    Toastify({
      text: "Eliminado del carrito",
      duration: 3000,
      destination: "",
      newWindow: true,
      close: true,
      gravity: "bottom",
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, red, #f27474)",
        borderRadius: "10px",
        justifyContent: "space-between",
      },
      onClick: function () { pintarCarrito() } 
    }).showToast();
  }
  
  //sweet alert
  //funcion capturar nombre y pintarlo 
  function alerta() {
    swal("CERAMICA", "Ingresa tu nombre:", {
      content: "input",
    })
      .then((value) => {
        if (Number(value)) {
          swal("Debes ingresar letras!","","warning")
            .then(() => { window.location.reload() })
        } else if (value) {
          swal(`Bienvenido: ${value.toUpperCase()}`)
          localStorage.setItem("nombre", JSON.stringify(value))
          const nombreUsuario = JSON.parse(localStorage.getItem("nombre"))
          usuario.innerHTML = `Usuario: ${nombreUsuario.toUpperCase()}`
        } else {
          swal("Debes ingresar un nombre!","", "warning")
            .then(() => { window.location.reload() })
        }
      })
  }
  //funcion bienvenida con nombre del ls
  function alerta2(nombreUsuario) {
    swal("CERAMICA", `"Bienvenido: ${nombreUsuario.toUpperCase()}"`)
  }
  //funcion finalizar compra
  function alerta3() {
    swal("Compra exitosa!", "Gracias por comprar en CERAMICA", "success")
  }
  //funcion finalizar compra carrito vacio
  function alerta4() {
    swal("Carrito vacío!", "Debes ingresar productos al carrito", "error")
  }
  function alerta5(){
    swal("Carrito vacío!","", "error")
  }
