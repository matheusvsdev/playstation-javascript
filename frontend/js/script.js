// Seleciona o contêiner que envolve as imagens principais do carrossel.
const imgContainer = document.querySelector(".img-container");

// Seleciona todas as miniaturas relacionadas às imagens do carrossel.
const thumbnailContainer = document.querySelector(".thumbnail-container");

// Define o índice da imagem atual como 2, ou seja, a terceira imagem será a ativa inicialmente.
let currentIndex = 2;

function updateCarousel() {
  const images = document.querySelectorAll(".carousel-img");
  const thumbnails = document.querySelectorAll(".thumbnail");

  // Itera por todas as imagens do carrossel.
  images.forEach((img, index) => {
    if (index === currentIndex) {
      // Adiciona a classe "active" à imagem correspondente ao índice atual.
      img.classList.add("active");
    } else {
      // Remove a classe "active" das demais imagens.
      img.classList.remove("active");
    }
  });

  // Itera por todas as miniaturas.
  thumbnails.forEach((thumb, index) => {
    if (index === currentIndex) {
      // Adiciona a classe "active-thumbnail" à miniatura correspondente.
      thumb.classList.add("active-thumbnail");
    } else {
      // Remove a classe "active-thumbnail" das demais miniaturas.
      thumb.classList.remove("active-thumbnail");
    }
  });

  // Centraliza a imagem ativa no contêiner.
  const containerWidth = imgContainer.offsetWidth;

  // Obtém a largura do contêiner de imagens.
  const activeImageWidth = images[currentIndex].offsetWidth;

  // Obtém a largura da imagem ativa.
  const offset = containerWidth / 2 - activeImageWidth / 2;

  // Calcula o deslocamento necessário para centralizar a imagem ativa.
  imgContainer.style.transform = `translateX(${
    // Atualiza a posição do contêiner aplicando uma transformação de deslocamento.
    offset - currentIndex * (activeImageWidth + 50)
  }px)`;
}

// Função para carregar as imagens dinamicamente do backend
function loadImages() {
  fetch("http://localhost:5001/api/images") // Busca as imagens da API do backend
    .then((response) => response.json())
    .then((images) => {
      // Adiciona as imagens e miniaturas ao DOM
      images.forEach((image, index) => {
        // Criar imagem principal do carrossel
        const img = document.createElement("img");
        img.src = image.url; // URL fornecida pela API
        img.alt = image.name;
        img.classList.add("carousel-img");
        if (index === 0) img.classList.add("active"); // Ativa a primeira imagem
        imgContainer.appendChild(img);

        // Criar miniatura
        const thumbnail = document.createElement("img");
        thumbnail.src = image.url; // URL fornecida pela API
        thumbnail.alt = image.name;
        thumbnail.classList.add("thumbnail");
        if (index === 0) thumbnail.classList.add("active-thumbnail"); // Ativa a primeira miniatura
        thumbnailContainer.appendChild(thumbnail);

        // Adiciona evento de clique às miniaturas
        thumbnail.addEventListener("click", () => {
          currentIndex = index;
          updateCarousel(); // Atualiza o carrossel ao clicar em uma miniatura
        });
      });

      // Inicializa o carrossel
      updateCarousel();
    })
    .catch((error) => console.error("Erro ao carregar imagens:", error));
}

// Carrega as imagens ao iniciar
loadImages();
