//Envio Formulario Contacto
    emailjs.init('user_hx2rYaxbexZ0qlT8bs771')
    const btn = document.getElementById('button-contacto');

/**
 * Agrega un controlador de eventos al evento "submit" del formulario.
 * @function EventListenerSubmit
 * @param {Event} event - El evento que desencadenó la función. En este caso, el evento "submit" del formulario.
 * @return {void} No retorna ningún valor explícito.
 */

 document.getElementById('form')
    .addEventListener('submit', function(event) {
    event.preventDefault();

    

    const serviceID = 'default_service';
    const templateID = 'template_y735lib';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {

            Swal.fire({
                icon: 'success',
                title: 'Se envió el mensaje',
                timer: 2500,
                showConfirmButton: false
              })

        window.location = "contacto.html";

        }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
        });
    });


