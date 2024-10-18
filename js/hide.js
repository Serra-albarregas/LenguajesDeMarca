function toggleExplanation(x, button) {
    var explanation = document.getElementById("detailed-explanation-"+x);
    if (explanation.classList.contains("hidden")) {
      explanation.classList.remove("hidden");
      button.textContent = "Ocultar detalles"
    } else {
      explanation.classList.add("hidden");
      button.textContent = "Mostrar detalles"
    }
  }