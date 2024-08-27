const presentacion__contenido__texto = document.getElementById("presentacion__contenido__texto");
const boton__encriptar = document.getElementById("boton__encriptar");
const boton__desencriptar = document.getElementById("boton__desencriptar");
const boton__copiar__mensaje = document.getElementById("boton__copiar__mensaje");
const mensaje__encriptado = document.getElementById("mensaje__encriptado");
const muneco = document.getElementById("muñeco_texto_encriptado");
const ingresarTexto = document.getElementById("ingresar_texto");
const zonaDerecha = document.getElementById("zona__derecha");


/*
Las "llaves" de encriptación que utilizaremos son las siguientes:

La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

let claveLetras = [
    ["e","enter"],
    ["i","imes"],
    ["a","ai"],
    ["o","ober"],
    ["u","ufat"],
]

resetPagina();

boton__encriptar.addEventListener("click", () => {
    let texto = presentacion__contenido__texto.value.toLowerCase();
    texto = eliminarAcentos(texto);
    texto = eliminarCaracteresEspeciales(texto);

    if(texto != "") {
        reemplazarAreaMensaje(encriptado(texto));
    } else {
        alert("No se ha introducido ningun texto");
        resetPagina();
    }

});

boton__desencriptar.addEventListener("click", () => {
    let texto = presentacion__contenido__texto.value.toLowerCase();
    texto = eliminarAcentos(texto);
    texto = eliminarCaracteresEspeciales(texto);
    
    if(texto != "") {
        reemplazarAreaMensaje(desencriptado(texto));
    } else {
        alert("No se ha introducido ningun texto");
        resetPagina();
    }

});

boton__copiar__mensaje.addEventListener("click", () => {
    let texto = mensaje__encriptado;

    texto.select();
    document.execCommand('copy');
    alert("Mensaje copiado");

    resetPagina();
});


function encriptado(newText) {
    for(let i=0; i<claveLetras.length; i++) {
        if(newText.includes(claveLetras[i][0])) {
            newText = newText.replaceAll(claveLetras[i][0], claveLetras[i][1]);
        }
    }
    return newText;
}


function desencriptado(newText) {
    for(let i=0; i<claveLetras.length; i++) {
        if(newText.includes(claveLetras[i][1])) {
            newText = newText.replaceAll(claveLetras[i][1], claveLetras[i][0]);
        }
    }
    return newText;
}


function reemplazarAreaMensaje(texto) {
    mensaje__encriptado.innerHTML = texto;
    muneco.classList.add("boton__oculto");
    ingresarTexto.style.display = "none";
    presentacion__contenido__texto.value = "";
    boton__copiar__mensaje.style.display = "block";
    zonaDerecha.classList.add("ajustar");
    mensaje__encriptado.classList.add("ajustar");
}

function resetPagina() {
    mensaje__encriptado.innerHTML = "";
    muneco.classList.remove('boton__oculto');
    ingresarTexto.style.display = "block";
    boton__copiar__mensaje.style.display = "none";
    zonaDerecha.classList.remove('ajustar');
    mensaje__encriptado.classList.remove('ajustar');
    presentacion__contenido__texto.focus();
}


function eliminarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function eliminarCaracteresEspeciales(texto) {
    return texto.replace(/[^a-zA-Z0-9 ]/g, "");
}