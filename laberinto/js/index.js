$(document).ready(function() {
    const contenedorLaberinto = $('#laberinto');
    const menuDificultad = $('#menu-dificultad');
    const botonVolver = $('#boton-volver');
    let tamanioLaberinto;
    let laberinto = [];
    let posicionJugador = { x: 1, y: 1 };
    let posicionObjetivo;

    function inicializarLaberinto() {
        laberinto = Array.from({ length: tamanioLaberinto }, () => Array(tamanioLaberinto).fill('pared'));
    }

    function crearLaberinto() {
        inicializarLaberinto();
        generarLaberintoDFS(1, 1);
        laberinto[posicionJugador.x][posicionJugador.y] = 'vacio';
        posicionObjetivo = { x: tamanioLaberinto - 2, y: tamanioLaberinto - 2 };
        laberinto[posicionObjetivo.x][posicionObjetivo.y] = 'vacio';
    }

    function elegirDificultad(dificultad) {
        switch (dificultad) {
            case 'facil':
                tamanioLaberinto = 31;
                break;
            case 'medio':
                tamanioLaberinto = 61;
                break;
            case 'dificil':
                tamanioLaberinto = 91;
                break;
        }
        posicionJugador = { x: 1, y: 1 };
        crearLaberinto();
        dibujarLaberinto();
        menuDificultad.hide();
        contenedorLaberinto.show();
        botonVolver.show();
    }

    function generarLaberintoDFS(x, y) {
        const direcciones = [
            { dx: -2, dy: 0 }, // Arriba
            { dx: 2, dy: 0 },  // Abajo
            { dx: 0, dy: -2 }, // Izquierda
            { dx: 0, dy: 2 }   // Derecha
        ];

        direcciones.sort(() => Math.random() - 0.5);
        laberinto[x][y] = 'vacio';

        for (const { dx, dy } of direcciones) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx > 0 && nx < tamanioLaberinto - 1 && ny > 0 && ny < tamanioLaberinto - 1 && laberinto[nx][ny] === 'pared') {
                laberinto[nx - dx / 2][ny - dy / 2] = 'vacio';
                generarLaberintoDFS(nx, ny);
            }
        }
    }

    function dibujarLaberinto() {
        contenedorLaberinto.empty();
        const tamanioContenedor = Math.min(contenedorLaberinto.width(), contenedorLaberinto.height());
        const tamanioCelda = Math.floor(tamanioContenedor / tamanioLaberinto);
    
        contenedorLaberinto.css({
            gridTemplateColumns: `repeat(${tamanioLaberinto}, ${tamanioCelda}px)`,
            gridTemplateRows: `repeat(${tamanioLaberinto}, ${tamanioCelda}px)`
        });
    
        for (let i = 0; i < tamanioLaberinto; i++) {
            for (let j = 0; j < tamanioLaberinto; j++) {
                let tipoCelda = 'celda';
                if (laberinto[i][j] === 'pared') tipoCelda += ' pared';
                if (i === posicionJugador.x && j === posicionJugador.y) tipoCelda += ' jugador';
                if (i === posicionObjetivo.x && j === posicionObjetivo.y) tipoCelda += ' objetivo';
                contenedorLaberinto.append(`<div class="${tipoCelda}" data-x="${i}" data-y="${j}"></div>`);
            }
        }
    }    

    function moverJugador(dx, dy) {
        const posX = posicionJugador.x + dx;
        const posY = posicionJugador.y + dy;

        if (posX >= 0 && posX < tamanioLaberinto && posY >= 0 && posY < tamanioLaberinto && laberinto[posX][posY] !== 'pared') {
            posicionJugador.x = posX;
            posicionJugador.y = posY;
            dibujarLaberinto();
            comprobarVictoria();
        }
    }

    function comprobarVictoria() {
        if (posicionJugador.x === posicionObjetivo.x && posicionJugador.y === posicionObjetivo.y) {
            setTimeout(() => {
                alert('¡Ganaste! El laberinto se reiniciará.');
                reiniciarJuego();
            }, 100);
        }
    }

    function reiniciarJuego() {
        menuDificultad.show();
        contenedorLaberinto.hide();
        botonVolver.hide();
    }

    $('#boton-facil').click(function() {
        elegirDificultad('facil');
    });

    $('#boton-medio').click(function() {
        elegirDificultad('medio');
    });

    $('#boton-dificil').click(function() {
        elegirDificultad('dificil');
    });

    botonVolver.click(function() {
        reiniciarJuego();
    });

    $(document).keydown(function(event) {
        switch (event.key) {
            case 'ArrowUp':
                moverJugador(-1, 0);
                break;
            case 'ArrowDown':
                moverJugador(1, 0);
                break;
            case 'ArrowLeft':
                moverJugador(0, -1);
                break;
            case 'ArrowRight':
                moverJugador(0, 1);
                break;
        }
    });
});
