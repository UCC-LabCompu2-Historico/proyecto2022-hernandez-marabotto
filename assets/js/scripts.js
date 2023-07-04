jQuery('document').ready(function($){

    /**
     * Descripción de la función:
     * Esta función controla la apariencia del menú desplegable al hacer clic en un botón.
     * Cuando el botón es clicado, la función verifica si el menú tiene la clase 'show'.
     * Si tiene la clase 'show', se la elimina, ocultando el menú. Si no tiene la clase 'show', se la agrega, haciendo que el menú sea visible en la interfaz de usuario.
     * @method Menu
     */
var menuBtn=$('.menu-icon'),
menu=$('.navigation ul');

    menuBtn.click(function(){
        if(menu.hasClass('show')){
            menu.removeClass('show');
        }else{
            menu.addClass('show');
        }
    });

    /**
     * Descripción de la función:
     * Esta función controla la apariencia del menú desplegable del carrito al hacer clic en un botón.
     */
var carritoMenuBtn=$('.car'),
carritomenu=$('.dropdown-menu');

carritoMenuBtn.click(function(){
        if(carritomenu.hasClass('show')){
            carritomenu.removeClass('show');
        }else{
            carritomenu.addClass('show');
        }
    });

});


//productos
let imagenes = document.querySelectorAll('.card-img');
let modal = document.querySelector('#modal');
let img = document.querySelector('#modal-img');
let boton = document.querySelector('#modal-boton');

for(let i = 0; i<imagenes.length;i++){
    imagenes[i].addEventListener('click',function(e){
        modal.classList.toggle("modal-open");
        let src = e.target.src;
        img.setAttribute("src",src);
    });
}
boton.addEventListener('click',function(){
    modal.classList.toggle("modal-open");
});


/**
 * Descripción de la función:
 * Esta función valida la sintaxis de una dirección de correo electrónico utilizando una expresión regular.
 * La expresión regular utilizada comprueba si la dirección de correo tiene el formato correcto.
 * @method validarCorreo
 * @param {string} correo - La dirección de correo electrónico a validar.
 */
function validarCorreo(correo){
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(correo);
    if(esValido == true){
        console.log("es valido el correo");
    }
    else{
        alert("el correo no es válido");
    }
}


/**
 * Descripción de la función:
 * Esta función validar nombres y permite únicamente la entrada de letras (mayúsculas y minúsculas, incluidas las letras acentuadas) y algunos caracteres especiales en un campo de texto.
 * Cualquier otro carácter ingresado será bloqueado y no se mostrará en el campo de texto.
 * @method sololetras
 * @param {Event} e - El objeto Event que representa el evento de teclado.
 * @return {boolean} La función devuelve `false` si el carácter ingresado no es una letra válida o un carácter especial permitido, lo que evita que se muestre en el campo de texto.
 *Devuelve `true` si el carácter es válido y debe permitirse.
 */
function sololetras(e){
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key).toLowerCase();
    letras = " abcdefghijklmnñopqrstuvwxyzáéíóúü";
    teclado_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            teclado_especial = true; break;
        }
    }
    if(letras.indexOf(teclado) == -1 && !teclado_especial){
        return false;
    }
}

/**
 * Descripción de la función:
 * Esta función valida numeros y permite únicamente la entrada de números en un campo de texto.
 * @method solonumeros
 * @param {Event} e - El objeto Event que representa el evento de teclado.
 * @return {boolean} La función devuelve `false` si el carácter ingresado no es un número válido o un carácter especial permitido, lo que evita que se muestre en el campo de texto.
 * Devuelve `true` si el carácter es un número válido y debe permitirse.
 */
function solonumeros(e){
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key).toLowerCase();
    numeros = "0123456789";
    teclado_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            teclado_especial = true; break;
        }
    }
    if(numeros.indexOf(teclado) == -1 && !teclado_especial){
        return false;
    }
}


/**
 * Descripción de la función:
 * La función `validar` se utiliza para validar un formulario que contiene los siguientes campos: nombre, correo, celular y mensaje.
 * Verifica si todos los campos son obligatorios, si el correo es válido, si el celular tiene una longitud adecuada y si es un número válido.
 * @method valida
 * @return {boolean} La función devuelve `false` si alguna de las validaciones falla, lo que impide que se envíe el formulario. Devuelve `true` si todas las validaciones son correctas y el formulario puede ser enviado.
 */
function validar(){
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let celular = document.getElementById("celular").value;
    let mensaje = document.getElementById("mensaje").value;
    let expresion = /\w+@\w+\.+[a-z]/;
    if(nombre ==="" || correo ==="" || celular ==="" || mensaje ===""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(!expresion.test(correo)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo no es válido',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(celular.length>10){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El celular es muy largo',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(isNaN(celular)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El celular ingresado no es un número',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
}

// Configuracion de grafico de lineas

    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / data.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const data = [];
    const data2 = [];
    let prev = 100;
    let prev2 = 80;
    for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    data.push({x: i, y: prev});
    prev2 += 5 - Math.random() * 10;
    data2.push({x: i, y: prev2});
}
    var ctx= document.getElementById("grafico").getContext("2d");
    var grafico= new Chart(ctx,{
    type: 'linea',
    data: {
    datasets: [{
    borderColor: 'rgb(51, 156, 255 )',
    borderWidth: 1,
    radius: 0,
    data: data,
},
{
    borderColor: 'rgb(233, 236, 27 )',
    borderWidth: 1,
    radius: 0,
    data: data2,
}]
},
    options:{
    animation,
    interaction: {
    intersect: false
},
    plugins: {
    legend: false
},
    scales: {
    x: {
    type: 'numero',
    easing: 'alinear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
    if (ctx.type !== 'data' || ctx.xStarted) {
    return 0;
}
    ctx.xStarted = true;
    return ctx.index * delayBetweenPoints;
}
},
    y: {
    type: 'numero',
    easing: 'alinear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
    if (ctx.type !== 'data' || ctx.yStarted) {
    return 0;
}
    ctx.yStarted = true;
    return ctx.index * delayBetweenPoints;
}
}
}
},
});

/**
 * Descripción de la función:
 * La función `draw` se utiliza para dibujar un patrón de rectángulos de diferentes colores en un elemento canvas HTML.
 * @method draw
 */
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(75,0,130)";
        ctx.fillRect (10, 10, 1000, 50);

        ctx.fillStyle = "rgb(0, 0, 255)";
        ctx.fillRect (30, 30, 1000, 50);

        ctx.fillStyle = "rgb(0,255,0)";
        ctx.fillRect (50, 50, 1000, 50);

        ctx.fillStyle = "rgb(255,255,0)";
        ctx.fillRect (70, 70, 1000, 50);

        ctx.fillStyle = "rgb(0,204,108)";
        ctx.fillRect (90, 90, 1000, 50);

        ctx.fillStyle = "rgb(255,127,0)";
        ctx.fillRect (110, 110, 1000, 50);

        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect (130, 130, 1000, 50);
    }
}

