// Productos
const productos = [
    { id: 1, nombre: "Notebook", precio: 1500 },
    { id: 2, nombre: "Mouse", precio: 50 },
    { id: 3, nombre: "Teclado", precio: 100 },
    { id: 4, nombre: "Monitor", precio: 800 }
];

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Contenedor
const contenedorProductos = document.getElementById("productos");

// Render productos
productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("card");

    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";

    // SIN dataset
    boton.onclick = () => agregarAlCarrito(producto.id);

    div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
    `;

    div.appendChild(boton);
    contenedorProductos.appendChild(div);
});

// Agregar al carrito con cantidad
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    Swal.fire({
    title: "Agregado",
    text: "Producto añadido al carrito",
    icon: "success",
    timer: 1200,
    showConfirmButton: false
});}