const usuarios = [
    { email: "p1@ejemplo.com", contraseña: "123" },
    { email: "p2@ejemplo.com", contraseña: "321" }
];

function validarEmail(email) {

    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return patronEmail.test(email);

}

document.getElementById('formulario').addEventListener('submit', function(event) {
    
    event.preventDefault();

    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    if (email.length === 0 && contraseña.length === 0) {

        Swal.fire({
            title: "Advertencia",
            text: "Campos correo electrónico y contraseña están vacíos",
            icon: "warning"
        });

        return;

    } else if (email.length === 0) {

        Swal.fire({
            title: "Advertencia",
            text: "Campo correo electrónico esta vacío",
            icon: "warning"
        });

        return;

    } else if (contraseña.length === 0) {

        Swal.fire({
            title: "Advertencia",
            text: "Campo contraseña esta vacío",
            icon: "warning"
        });

        return;

    }

    if (!validarEmail(email)) {
        
        Swal.fire({
            title: "Error",
            text: "Formato de correo electrónico no valido",
            icon: "error"
        });

        return;

    }

    const usuario = usuarios.find(usuario => usuario.email === email && usuario.contraseña === contraseña);

    if (usuario) {

        window.location.href = 'https://jdrioisaza.github.io/clon/';

    } else {
        
        Swal.fire({
            title: "Error",
            text: "Credenciales incorrectas",
            icon: "error"
        });

    }
});

document.getElementById('switch').addEventListener('click', function() {

    const campoContraseña = document.getElementById('contraseña');
    const tipoCampoContraseña = campoContraseña.getAttribute('type');
    
    if (tipoCampoContraseña === 'password') {
        
        campoContraseña.setAttribute('type', 'text');
        this.textContent = 'Ocultar';

    } else {

        campoContraseña.setAttribute('type', 'password');
        this.textContent = 'Mostrar';

    }

});