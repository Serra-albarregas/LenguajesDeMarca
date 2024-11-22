const baseURL = window.location.hostname.match('.*127.0.0.1.*') ? '' : '/teoriaHTML';
fetch(`${baseURL}/menu.html`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el menú:', error));
