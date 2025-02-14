const url = '../../recursos/Javascript.pdf';
let pdfDoc = null, pageNum = 1;
let scale = 1.5;
let pageRendering = false;
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const pageIndicator = document.querySelector('#page-indicator');
const pageNumberInput = document.querySelector('#page-number');
const pdfContainer = document.querySelector('#pdf-container');
const menu = document.querySelector("#menu");
const secciones = [
    { nombre: "Inicio", pagina: 1 },
    { nombre: "La consola", pagina: 6 },
    { nombre: "Organización", pagina: 15 },
    { nombre: "Variables", pagina: 20 },
    { nombre: "Strings", pagina: 37 },
    { nombre: "Operadores", pagina: 43 },
    { nombre: "Estructuras de control", pagina: 59 },
    { nombre: "Ámbito", pagina: 68 },
    { nombre: "Funciones", pagina: 73 },
    { nombre: "Objetos", pagina: 89 },
    { nombre: "Importación de archivos", pagina: 104 },
    { nombre: "Arrays", pagina: 118 },
    { nombre: "DOM", pagina: 138 }
]

function renderPage(num) {
    if (!pageRendering){
    pdfDoc.getPage(num).then(page => {
        pageRendering=true;
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width * window.devicePixelRatio;
        canvas.height = canvas.width/1.776223;
        canvas.style.width = `${viewport.width * window.devicePixelRatio}px`;
        canvas.style.height = `${canvas.style.width/1.776223}px`;
        const ctx = canvas.getContext('2d');
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        page.render({ canvasContext: ctx, viewport: viewport });
        pageIndicator.textContent = `Página ${num} de ${pdfDoc.numPages}`;
        pageNumberInput.value = num;
        pageRendering=false;
    });
}
}

function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.left = sidebar.style.left === "0px" ? "-300px" : "0px";
}

function prevPage() {
    if (pageNum > 1) {
        pageNum--;
        renderPage(pageNum);
    }
}

function nextPage() {
    if (pageNum < pdfDoc.numPages) {
        pageNum++;
        renderPage(pageNum);
    }
}

function goToPage() {
    let inputPage = parseInt(pageNumberInput.value);
    if (inputPage >= 1 && inputPage <= pdfDoc.numPages) {
        pageNum = inputPage;
        renderPage(pageNum);
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.body.classList.add("fullscreen");
        menu.toggleAttribute("hidden", true);
        scale = 2.5;
    } else {
        document.exitFullscreen();
        document.body.classList.remove("fullscreen");
        menu.toggleAttribute("hidden", false);
        scale = 1.5;
    }
    setTimeout(() => renderPage(pageNum), 100);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") nextPage();
    if (event.key === "ArrowLeft") prevPage();
});

document.addEventListener("fullscreenchange", function() {
    if (!document.fullscreenElement) {
        document.body.classList.remove("fullscreen");
        menu.toggleAttribute("hidden", false);
        scale = 1.5;
        setTimeout(() => renderPage(pageNum), 100);
    }
});

pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    renderPage(pageNum);
    let sidebar = document.getElementById("sidebar");
    
    secciones.forEach(item => {
        let button = document.createElement("button");
        button.innerText = item.nombre;
        button.addEventListener("click", () => {
            pageNum = item.pagina;
            renderPage(pageNum);
        });
        sidebar.appendChild(button);
    });
});