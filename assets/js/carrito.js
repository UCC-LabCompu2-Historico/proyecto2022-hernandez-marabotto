class Carrito{
    /**
     Añade el producto al carrito de compras.
     @method comprarProducto
     @param {string} ParámetroA - Representa el evento 'e' generado al intentar agregar un producto al carrito.
     @param {number} ParámetroB - Representa un valor numérico, pero no se especifica su función en el contexto del método.
     @return No hay valor de retorno explícito definido en la descripción de la función.
     */

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement;
            this.leerDatosProducto(producto);

            //console.log(producto);
        }
    }

    /**
     * Lee los datos del producto seleccionado y decide si agregarlo al carrito de compras o mostrar una advertencia.
     * @method leerDatosProducto
     * @param {Element} producto - El elemento HTML del producto seleccionado, que contiene información como imagen, título, precio e identificador.
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero puede actualizar el estado interno del carrito de compras.
     */

    leerDatosProducto(producto){
        const infoProducto ={
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h5').textContent,
            precio : producto.querySelector('.precio').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id){
            //console.log('El producto ya está agregado');
            Swal.fire({
                icon: 'warning',
                title: 'No tenemos stock suficiente, prueba con menos unidades',
                timer: 2500,
                showConfirmButton: false
            })
        }
        else{
            this.insertarCarrito(infoProducto);
            //console.log(infoProducto);
            Swal.fire({
                icon: 'success',
                title: 'Agregado',
                timer: 2500,
                showConfirmButton: false
            })
        }
        
    }

    /**
     * Inserta un producto en el carrito de compras y lo muestra en la interfaz.
     * @method insertarCarrito
     * @param {Object} producto - Un objeto que contiene la información del producto a agregar al carrito, incluyendo la imagen, título, precio e identificador.
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero actualiza el carrito en la interfaz y en el almacenamiento local.
     */

    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    /**
     * Elimina un producto del carrito de compras y actualiza la interfaz y el almacenamiento local.
     * @method eliminarProducto
     * @param {Event} e - El evento 'e' generado al intentar eliminar un producto del carrito.
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero actualiza el carrito en la interfaz y el almacenamiento local, y recalcula el total del carrito.
     */

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
            Swal.fire({
                icon: 'info',
                title: 'Eliminado',
                timer: 2500,
                showConfirmButton: false
            })
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();        
    }

    /**
     * Vacía completamente el carrito de compras, eliminando todos los productos de la interfaz y el almacenamiento local.
     * @method vaciarCarrito
     * @param {Event} e - El evento 'e' generado al intentar vaciar el carrito.
     * @return {boolean} Devuelve false para evitar que el evento se propague o cause un comportamiento no deseado.
     */
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
            Swal.fire({
                icon: 'info',
                title: 'Carrito Vacío',
                timer: 2500,
                showConfirmButton: false
            })
        }
        this.vaciarLocalStorage();
        return false;
    }

    /**
     * Guarda el producto proporcionado en el almacenamiento local del navegador.
     * @method guardarProductosLocalStorage
     * @param {Object} producto - Un objeto que contiene la información del producto a guardar en el almacenamiento local.
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero almacena el producto en el almacenamiento local.
     */

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    /**
     * Obtiene la lista de productos almacenados en el almacenamiento local del navegador.
     * @method obtenerProductosLocalStorage
     * @return {Array} Una lista de productos obtenida del almacenamiento local o una lista vacía si no hay productos almacenados.
     */
    obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem('productos')===null){
            productoLS = [];
        }
        else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    /**
     * Elimina el producto con el ID proporcionado del almacenamiento local del navegador.
     * @method eliminarProductoLocalStorage
     * @param {string} productoID - El ID del producto que se va a eliminar del almacenamiento local.
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero actualiza el almacenamiento local al eliminar el producto.
     */

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    /**
     * Lee los productos almacenados en el almacenamiento local y los muestra en la interfaz del carrito.
     * @method leerLocalStorage
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero muestra los productos en la interfaz del carrito.
     */

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML= `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    /**
     * Lee los productos almacenados en el almacenamiento local y muestra la lista de compra con los productos y sus cantidades.
     * @method leerLocalStorageCompra
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero muestra los productos y sus cantidades en la lista de compra.
     */
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML= `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio * producto.cantidad}</td>
            <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    /**
     * Vacía completamente el almacenamiento local, eliminando todos los datos almacenados en el carrito y la lista de compra.
     * @method vaciarLocalStorage
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero vacía completamente el almacenamiento local.
     */

    vaciarLocalStorage(){
        localStorage.clear();        
    }

    /**
     * Procesa el pedido del usuario, redirigiéndolo a la página de carrito si hay productos en el carrito, o muestra un mensaje de error si el carrito está vacío.
     * @method procesarPedido
     * @param {Event} e - El evento click que desencadena la función.
     * @return No hay valor de retorno explícito definido en la descripción de la función. La función redirige a la página de carrito si hay productos en el carrito o muestra un mensaje de error si el carrito está vacío.
     */

    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            //console.log('El carrito está vacío, agrega algún producto');
             Swal.fire({
                icon: 'error',
                title: 'El carrito está vacío, agrega un producto',
                timer: 2500,
                showConfirmButton: false
            })
        }
        else{
            location.href="carrito.html";
        }
    }

    /**
     * Calcula el subtotal, el impuesto IGV y el total de la compra basado en los productos y sus cantidades almacenados en el almacenamiento local.
     * @method calcularTotal
     * @return No hay valor de retorno explícito definido en la descripción de la función, pero muestra los valores del subtotal, IGV y total en la interfaz de usuario.
     */

    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productoLS.length; i++){
            let element = Number(productoLS[i].precio*productoLS[i].cantidad);
            total = total + element;
        }
        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$" + subtotal;
        document.getElementById('igv').innerHTML = "$" + igv;
        document.getElementById('total').value = "$" + total.toFixed(2);
    }
}

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var radio = canvas.height / 2;
    ctx.translate(radio, radio);
    radio = radio * 0.90;

    setInterval(dibujarReloj, 1000);
    setAlarm();

/**
 * Establece una alarma para mostrar un mensaje de advertencia después de un período de tiempo determinado.
 * @function setAlarm
 * @param {void} No recibe ningún parámetro.
 * @return {void} No retorna ningún valor explícito.
 *
 */
    function setAlarm() {
    setTimeout(function()
    {
        Swal.fire({
            icon: 'info',
            title: 'Alarma!',
            text: 'Comprar antes que cambien los precios por el dolar',
            timer: 2500,
            showConfirmButton: false
        });
    }, 90000);
}

/**
 * Dibuja un reloj analógico en un lienzo (canvas) utilizando el contexto 2D.
 *
 * @function dibujarReloj
 * @param {void} No recibe ningún parámetro.
 * @return {void} No retorna ningún valor explícito.
 *
 * La función `dibujarReloj` combina varias funciones auxiliares para dibujar un reloj analógico en un lienzo.
 * Primero, llama a la función `dibujarCara(ctx, radio)` para dibujar el círculo que representa la cara del reloj.
 * Luego, invoca la función `dibujarNumeros(ctx, radio)` para dibujar los números de las horas alrededor del reloj.
 * Finalmente, utiliza la función `dibujarTiempo(ctx, radio)` para dibujar las manecillas de las horas, minutos y segundos,
 * mostrando así la hora actual del sistema en el reloj analógico.
 */
    function dibujarReloj() {
    dibujarCara(ctx, radio);
    dibujarNumeros(ctx, radio);
    dibujarTiempo(ctx, radio);
}

/**
 * Dibuja la cara del reloj analógico en un lienzo (canvas) utilizando el contexto 2D.
 *
 * @function dibujarCara
 * @param {CanvasRenderingContext2D} ctx - El contexto 2D del lienzo en el que se dibujará la cara del reloj.
 * @param {number} radio - El radio del círculo que representa la cara del reloj.
 * @return {void} No retorna ningún valor explícito.
 *
 * La función `dibujarCara` utiliza el contexto 2D proporcionado para dibujar un círculo que representa la cara del reloj.
 * El centro del círculo se coloca en las coordenadas (0, 0) del lienzo. El radio del círculo es igual al valor del parámetro `radio`.
 * Esto resulta en un círculo blanco con un borde azul, que representa la cara del reloj.
 */
    function dibujarCara(ctx, radio) {
    ctx.beginPath();
    ctx.arc(0, 0, radio, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

    function dibujarNumeros(ctx, radio) {
    var angulo;
    var num;
    ctx.font = radio * 0.15 + `sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
    angulo = num * Math.PI / 6;
    ctx.rotate(angulo);
    ctx.translate(0, -radio * 0.85);
    ctx.rotate(-angulo);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(angulo);
    ctx.translate(0, radio * 0.85);
    ctx.rotate(-angulo);
}
}
/**
 * Dibuja las manecillas del reloj analógico (horas, minutos y segundos) en un lienzo (canvas) utilizando el contexto 2D.
 *
 * @function dibujarTiempo
 * @param {CanvasRenderingContext2D} ctx - El contexto 2D del lienzo en el que se dibujarán las manecillas.
 * @param {number} radio - El radio del círculo que representa la cara del reloj.
 * @return {void} No retorna ningún valor explícito.
 */

 function dibujarTiempo(ctx, radio) {
    var ahora = new Date();
    var hora = ahora.getHours();
    var minuto = ahora.getMinutes();
    var segundo = ahora.getSeconds();
    //hora
    hora = hora % 12;
    hora = (hora * Math.PI / 6) + (minuto * Math.PI / (6 * 60)) + (segundo * Math.PI / (360 * 60));
    dibujarManecilla(ctx, hora, radio * 0.5, radio * 0.07);
    //minuto
    minuto = (minuto * Math.PI / 30) + (segundo * Math.PI / (30 * 60));
    dibujarManecilla(ctx, minuto, radio * 0.8, radio * 0.07);
    // segundo
    segundo = (segundo * Math.PI / 30);
    dibujarManecilla(ctx, segundo, radio * 0.9, radio * 0.02);
}

/**
 * Dibuja una manecilla del reloj analógico en un lienzo (canvas) utilizando el contexto 2D.
 *
 * @function dibujarManecilla
 * @param {CanvasRenderingContext2D} ctx - El contexto 2D del lienzo en el que se dibujará la manecilla.
 * @param {number} pos - El ángulo en radianes donde se posicionará la manecilla.
 * @param {number} longitud - La longitud de la manecilla.
 * @param {number} ancho - El ancho de la manecilla.
 * @return {void} No retorna ningún valor explícito.
 */

    function dibujarManecilla(ctx, pos, longitud, ancho) {
    ctx.beginPath();
    ctx.lineWidth = ancho;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -longitud);
    ctx.stroke();
    ctx.rotate(-pos);
}



