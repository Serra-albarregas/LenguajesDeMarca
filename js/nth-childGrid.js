const nthInput = document.getElementById('nthInput');
const gridItems = document.querySelectorAll('.grid-item');
const nthMode = document.getElementById('nthOption');
const nthExample = document.getElementById('nth-childExample');
const nthExample2 = document.getElementById('nth-childMode');

function nthListener(){
    const { value: nthValue } = nthInput; // Valor ingresado en el input
    const { value: nthType } = nthOption; 

    // Remueve la clase "highlighted" de todos los elementos
    gridItems.forEach(item => item.classList.remove('highlighted'));
    nthExample.textContent = nthValue;
    nthExample2.textContent = nthType;
    
    if (!/^(\d+n?|\d+n\+\d+|\d+|odd|even)( of( [\.\#]?[A-Za-z0-9]+))?$/.test(nthValue)) {
        console.warn("Patrón no válido: usa un valor como '2n', '3n+1', o un número");
        return;
    }

    var query;
    if (nthType == ":nth-last-child") {
        query = ".grid-item:nth-last-child("+nthValue+")";
    }
    else {
        query = ".grid-item:nth-child("+nthValue+")";
    }
    console.log(query);
    try {
        // Selecciona los elementos que coinciden con el patrón
        document.querySelectorAll(query).forEach(item => {
            item.classList.add('highlighted');
        });
    } catch (error) {
        console.error("Error en el valor de nth-child:", error);
    }
}

nthInput.addEventListener('input', nthListener);

nthMode.addEventListener('change', nthListener)