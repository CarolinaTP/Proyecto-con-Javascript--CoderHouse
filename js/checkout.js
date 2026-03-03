let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedorCarrito");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciarCarrito");
const botonFinalizar = document.getElementById("finalizarCompra");
const mensaje = document.getElementById("mensaje");

// Mostrar carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
        totalElemento.textContent = "";
        return;
    }

    carrito.forEach((producto, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-index="${index}">Eliminar</button>
        `;

        contenedorCarrito.appendChild(div);
    });

    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalElemento.textContent = `Total: $${total}`;
}

// Eliminar producto individual
contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
});

// Vaciar carrito
botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// Finalizar compra
botonFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        mensaje.textContent = "No hay productos en el carrito.";
        return;
    }

    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    mensaje.textContent = "¡Compra realizada con éxito!";
});

// Inicializar
mostrarCarrito();