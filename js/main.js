// Array de productos
const productos = [
    { id: 1, nombre: "Notebook", precio: 1500 },
    { id: 2, nombre: "Mouse", precio: 50 },
    { id: 3, nombre: "Teclado", precio: 100 },
    { id: 4, nombre: "Monitor", precio: 800 }
];

// Obtener carrito desde localStorage o crear vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Contenedor
const contenedorProductos = document.getElementById("productos");

// Mostrar productos en DOM
productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    contenedorProductos.appendChild(div);
});

// Evento agregar al carrito
contenedorProductos.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.getAttribute("data-id"));
        const productoSeleccionado = productos.find(p => p.id === id);

        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        alert("Producto agregado al carrito");
    }
});