class Carrito{
    //Añadir el producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement;
            this.leerDatosProducto(producto);

            //console.log(producto);
        }
    }

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

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

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

    vaciarLocalStorage(){
        localStorage.clear();        
    }

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

    function dibujarReloj() {
    dibujarCara(ctx, radio);
    dibujarNumeros(ctx, radio);
    dibujarTiempo(ctx, radio);
}

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



