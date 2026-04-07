let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedorCarrito");
const totalElemento = document.getElementById("total");
const botonVaciar = document.getElementById("vaciarCarrito");
const botonFinalizar = document.getElementById("finalizarCompra");

// Guardar carrito (MEJORA)
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
        totalElemento.textContent = "";
        return;
    }

    carrito.forEach(producto => {

        // Validación (datos viejos)
        if (!producto.cantidad) {
            producto.cantidad = 1;
        }

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio} x ${producto.cantidad}</p>
        `;

        const btnSumar = document.createElement("button");
        btnSumar.textContent = "+";
        btnSumar.addEventListener("click", () => cambiarCantidad(producto.id, 1));

        const btnRestar = document.createElement("button");
        btnRestar.textContent = "-";
        btnRestar.addEventListener("click", () => cambiarCantidad(producto.id, -1));

        div.appendChild(btnSumar);
        div.appendChild(btnRestar);

        contenedorCarrito.appendChild(div);
    });

    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalElemento.textContent = `Total: $${total}`;
}

// Cambiar cantidad
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
}

// Vaciar carrito
botonVaciar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

// Finalizar compra
botonFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire("Carrito vacío");
        return;
    }

    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();

    Swal.fire({
        title: "Compra realizada",
        text: "Gracias por tu compra",
        icon: "success"
    });
});

// Inicializar
mostrarCarrito();