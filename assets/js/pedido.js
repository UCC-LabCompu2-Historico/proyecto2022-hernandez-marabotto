const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();


/**
 * Descripción de la función:
 * La función `cargarEventos` asigna controladores de eventos a los elementos relevantes de la interfaz de usuario para interactuar con el carrito de compras.
 * Estos eventos incluyen agregar productos al carrito, eliminar productos del carrito, vaciar el carrito de compras, leer los productos almacenados localmente al cargar la página y procesar el pedido de compra.
 * @method cargarEventos
 */
function cargarEventos(){
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
}