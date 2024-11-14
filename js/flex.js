const selectEj11 = document.getElementById('selectEj11');
const contEj11 = document.getElementById('contEj11');
const textEj11 = document.getElementById('textEj11');


function ej11Listener(){
    const { value: option } = selectEj11;
    contEj11.style.display = option;
    textEj11.textContent = option;
}

selectEj11.addEventListener('input', ej11Listener);