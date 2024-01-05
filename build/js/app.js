document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="imagen/avif">
            <source srcset="build/img/thumb/${i}.webm" type="imagen/webm">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Vocalista">
        `;

        galeria.appendChild(imagen);
    }
}