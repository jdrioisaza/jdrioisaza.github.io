let numeroMagico = Math.floor(Math.random() * 100) + 1;
let intentos = 10;
let clasificacion = JSON.parse(localStorage.getItem('clasificacion')) || [];

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const numero = parseInt(document.getElementById('numero').value);
    const intentosRestantes = document.getElementById('intentosRestantes');

    if (isNaN(numero) || numero < 1 || numero > 100) {
        Swal.fire({
            title: "Error",
            text: "Por favor ingresa un número válido entre 1 y 100.",
            icon: "error"
        });
        return;
    }

    intentos--;

    if (numero === numeroMagico) {
        Swal.fire({
            title: "¡Felicidades!",
            text: `Has adivinado el número mágico: ${numeroMagico}`,
            icon: "success"
        });
        actualizarClasificacion(intentos * 10);
        reiniciarJuego();
    } else if (intentos === 0) {
        Swal.fire({
            title: "Fin del Juego",
            text: `Lo siento, no te quedan más intentos. El número mágico era ${numeroMagico}`,
            icon: "error"
        });
        reiniciarJuego();
    } else {
        let mensaje = numero > numeroMagico ? "El número es menor" : "El número es mayor";
        Swal.fire({
            title: "Sigue intentando",
            text: mensaje,
            icon: "info"
        });
    }

    intentosRestantes.textContent = `Intentos restantes: ${intentos}`;
});

function reiniciarJuego() {
    numeroMagico = Math.floor(Math.random() * 100) + 1;
    intentos = 10;
    document.getElementById('intentosRestantes').textContent = `Intentos restantes: ${intentos}`;
}

function actualizarClasificacion(puntaje) {
    clasificacion.push(puntaje);
    clasificacion.sort((a, b) => b - a);
    clasificacion = clasificacion.slice(0, 5);
    localStorage.setItem('clasificacion', JSON.stringify(clasificacion));
    mostrarClasificacion();
}

function mostrarClasificacion() {
    const tablaPuntajes = document.getElementById('tablaPuntajes');
    tablaPuntajes.innerHTML = "";
    clasificacion.forEach((puntaje, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1}: ${puntaje} puntos`;
        tablaPuntajes.appendChild(li);
    });
}

reiniciarJuego();
mostrarClasificacion();
