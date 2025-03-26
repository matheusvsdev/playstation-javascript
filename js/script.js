const imgContainer = document.querySelector(".img-container");
const images = document.querySelectorAll(".carousel-img");
const thumbnails = document.querySelectorAll(".thumbnail");

let currentIndex = 2; // Começa na imagem 3 (índice 2)

function updateCarousel() {
  images.forEach((img, index) => {
    if (index === currentIndex) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      thumb.classList.add("active-thumbnail");
    } else {
      thumb.classList.remove("active-thumbnail");
    }
  });

  // Calcula o deslocamento para centralizar a imagem ativa
  const containerWidth = imgContainer.offsetWidth;
  const activeImageWidth = images[currentIndex].offsetWidth;
  const offset = containerWidth / 2 - activeImageWidth / 2;
  imgContainer.style.transform = `translateX(${
    offset - currentIndex * (activeImageWidth + 50)
  }px)`;
}

// Adiciona eventos de clique nas miniaturas
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Inicializa o carrossel
updateCarousel();
