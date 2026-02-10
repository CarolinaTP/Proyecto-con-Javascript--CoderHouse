// Array de productos
const productos = [
  { nombre: "Remera", precio: 1200 },
  { nombre: "Pantalón", precio: 2500 },
  { nombre: "Zapatillas", precio: 4800 }
];

let carrito = [];
let total = 0;

// Función para mostrar productos
function mostrarProductos() {
  console.log("Lista de productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
    console.log(`${i + 1}. ${productos[i].nombre} - $${productos[i].precio}`);
  }
}

// Función para agregar productos al carrito
function agregarProducto() {
  let opcion = prompt(
    "Ingrese el número del producto que desea comprar:\n1. Remera\n2. Pantalón\n3. Zapatillas"
  );

  if (opcion >= 1 && opcion <= productos.length) {
    let cantidad = prompt("Ingrese la cantidad:");

    carrito.push({
      producto: productos[opcion - 1],
      cantidad: Number(cantidad)
    });

    alert("Producto agregado al carrito");
  } else {
    alert("Opción inválida");
  }
}

// Función para calcular el total
function calcularTotal() {
  total = 0;

  for (let item of carrito) {
    total += item.producto.precio * item.cantidad;
  }

  console.log("Detalle del carrito:", carrito);
  alert(`El total de su compra es: $${total}`);
}

// Flujo principal del simulador
function iniciarSimulador() {
  alert("Bienvenido al simulador de compras");
  let continuar = true;

  while (continuar) {
    mostrarProductos();
    agregarProducto();
    continuar = confirm("¿Desea agregar otro producto?");
  }

  calcularTotal();
}

// Llamada a la función principal
iniciarSimulador();
