const selectEj11 = document.getElementById('selectEj11');
const contEj11 = document.getElementById('contEj11');

const selectEj12 = document.getElementById('selectEj12');
const contEj12 = document.getElementById('contEj12');

const selectEj13 = document.getElementById('selectEj13');
const contEj13 = document.getElementById('contEj13');

const alignItemsEj15 = document.getElementById('alignItemsEj15');
const justifyContentEj15 = document.getElementById('justifyContentEj15');
const alignSelfEj15 = document.getElementById('alignSelfEj15');
const contEj15 = document.getElementById('contEj15');
const selfEj15 = document.getElementById('selfEj15');


function ej11Listener(){
    const { value: option } = selectEj11;
    contEj11.style.display = option;
}

function ej12Listener(){
    const { value: option } = selectEj12;
    contEj12.style.flexDirection = option;
}

function ej13Listener(){
    const { value: option } = selectEj13;
    contEj13.style.flexWrap = option;
}

function ej15AlignItemsListener(){
    const { value: option } = alignItemsEj15;
    contEj15.style.alignItems = option;
}

function ej15JustifyContentListener(){
    const { value: option } = justifyContentEj15;
    contEj15.style.justifyContent = option;
}

function ej15AlignSelfListener(){
    const { value: option } = alignSelfEj15;
    selfEj15.style.alignSelf = option;
}

selectEj11.addEventListener('input', ej11Listener);
selectEj12.addEventListener('input', ej12Listener);
selectEj13.addEventListener('input', ej13Listener);
alignItemsEj15.addEventListener('input', ej15AlignItemsListener);
justifyContentEj15.addEventListener('input', ej15JustifyContentListener);
alignSelfEj15.addEventListener('input', ej15AlignSelfListener);