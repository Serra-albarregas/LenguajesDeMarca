const url = '../../recursos/Javascript.pdf';
let pdfDoc = null, pageNum = 1;
let scale = 1.5;
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');
const pageIndicator = document.getElementById('page-indicator');
const pageNumberInput = document.getElementById('page-number');
const pdfContainer = document.getElementById('pdf-container');

function renderPage(num) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width * window.devicePixelRatio;
        canvas.height = viewport.height * window.devicePixelRatio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        page.render({ canvasContext: ctx, viewport: viewport });
        pageIndicator.textContent = `Página ${num} de ${pdfDoc.numPages}`;
        pageNumberInput.value = num;
    });
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
        scale = 2.5;
    } else {
        document.exitFullscreen();
        document.body.classList.remove("fullscreen");
        scale = 1.5;
    }
    setTimeout(() => renderPage(pageNum), 100);
}

document.addEventListener("keydown", function (event) {
    if (document.fullscreenElement) {
        if (event.key === "ArrowRight") nextPage();
        if (event.key === "ArrowLeft") prevPage();
        if (event.key === "Escape") toggleFullScreen();
    }
});

pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    renderPage(pageNum);
});