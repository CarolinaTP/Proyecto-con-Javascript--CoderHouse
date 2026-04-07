let productos = [];

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar productos desde json
async function cargarProductos() {
    try {
        const response = await fetch("./js/productos.json");

        if (!response.ok) {
            throw new Error("Error al cargar JSON");
        }

        productos = await response.json();
        renderProductos();

    } catch (error) {
        console.error("Error:", error);

        Swal.fire({
            title: "Error",
            text: "No se pudieron cargar los productos",
            icon: "error"
        });
    }
}

// Render productos
function renderProductos() {
    const contenedorProductos = document.getElementById("productos");
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card");

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });

        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
        `;

        div.appendChild(boton);
        contenedorProductos.appendChild(div);
    });
}

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();

    Swal.fire({
        title: "Agregado",
        text: "Producto añadido al carrito",
        icon: "success",
        timer: 1200,
        showConfirmButton: false
    });
}

// Inicializar
cargarProductos();