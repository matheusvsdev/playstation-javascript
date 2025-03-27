// Função genérica para atualizar qualquer carrossel
function updateCarousel(container, thumbnailsContainer) {
  const images = container.querySelectorAll(".carousel-img");
  const thumbnails = thumbnailsContainer.querySelectorAll(".thumbnail");

  images.forEach((img, index) => {
    img.classList.toggle("active", index === currentIndex);
  });

  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active-thumbnail", index === currentIndex);
  });

  const containerWidth = container.offsetWidth;
  const activeImageWidth = images[currentIndex].offsetWidth;
  const offset = containerWidth / 2 - activeImageWidth / 2;

  container.style.transform = `translateX(${
    offset - currentIndex * (activeImageWidth + 50)
  }px)`;
}

// Função genérica para carregar imagens em carrosséis
function loadCarousel(endpoint, container, thumbnailsContainer) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((images) => {
      images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.url;
        img.alt = image.fileName;
        img.classList.add("carousel-img");
        if (index === 0) img.classList.add("active");
        container.appendChild(img);

        const thumbnail = document.createElement("img");
        thumbnail.src = image.url;
        thumbnail.alt = image.fileName;
        thumbnail.classList.add("thumbnail");
        if (index === 0) thumbnail.classList.add("active-thumbnail");
        thumbnailsContainer.appendChild(thumbnail);

        thumbnail.addEventListener("click", () => {
          currentIndex = index;
          updateCarousel(container, thumbnailsContainer);
        });
      });

      updateCarousel(container, thumbnailsContainer);
    })
    .catch((error) => console.error("Erro ao carregar imagens:", error));
}

// Seleciona os contêineres do DOM
const imgContainer = document.querySelector(".img-container");
const thumbnailContainer = document.querySelector(".thumbnail-container");

// Define o índice inicial
let currentIndex = 0;

// Carrega os dois carrosséis dinamicamente
loadCarousel(
  "http://localhost:5001/api/bannerImages?images=assassins.jpg,death.jpg,forza.jpg,little.jpg,yakuza.jpg",
  imgContainer,
  thumbnailContainer
);

// Informações fixas para as thumbnails do PlayStation
const playstationThumbnails = [
  {
    src: "img/ps5.jpg",
    title: "Conheça todos os consoles e acessórios do PS5",
    subtitle: "Console PlayStation 5",
    description:
      "Descubra a mais nova geração de jogos incríveis para PlayStation.",
    alt: "PlayStation 5",
  },
  {
    src: "img/ps5pro.jpg",
    title: "Conheça todos os consoles e acessórios do PS5",
    subtitle: "Console PlayStation 5 Pro",
    description:
      "Jogue títulos para PS5® com os visuais mais impressionantes de todos os tempos em um console PlayStation.",
    alt: "PlayStation 5 Pro",
  },
  {
    src: "img/headset.jpg",
    title: "Conheça todos os consoles e acessórios do PS5",
    subtitle: "Headset sem fio PULSE Elite™",
    description:
      "Ouça áudio de jogos mais realista neste modelo de headset confortável e equipado com microfone retrátil e bateria embutida de longa duração.",
    alt: "Headset PlayStation",
  },
  {
    src: "img/fone.jpg",
    title: "Conheça todos os consoles e acessórios do PS5",
    subtitle: "Fones de ouvido sem fio PULSE Explore™",
    description:
      "Curta sons realistas aonde quer que os jogos levem você com um design portátil equipado com microfones ocultos e um estojo de carregamento para acompanhar.",
  },
];

// Seleciona os elementos DOM que serão atualizados
const consoleTitle = document.getElementById("console-title");
const consoleSubtitle = document.getElementById("console-subtitle");
const consoleDescription = document.getElementById("console-description");
const consoleImage = document.getElementById("console-image");
const thumbnailPlay = document.getElementById("thumbnail-play");

function updatePlaystationContent(index) {
  const thumb = playstationThumbnails[index];

  consoleTitle.innerHTML = thumb.title;
  consoleSubtitle.innerHTML = thumb.subtitle;
  consoleDescription.innerHTML = thumb.description;
  consoleImage.src = thumb.src;
  consoleImage.alt = thumb.alt;
}

// Atualiza os estilos das thumbnails
function updateThumbnailStyles() {
  const thumbnails = thumbnailPlay.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active-thumbnail", index === currentIndex);
  });
}

// Cria as thumbnails dinamicamente
function createPlaystationThumbs() {
  playstationThumbnails.forEach((thumb, index) => {
    const imgThumb = document.createElement("img");
    imgThumb.src = thumb.src;
    imgThumb.alt = thumb.alt;
    imgThumb.classList.add("thumbnail");

    // Define a primeira como ativa por padrão
    if (index === 0) {
      imgThumb.classList.add("active-thumbnail");
    }

    // Adiciona evento de clique
    imgThumb.addEventListener("click", () => {
      currentIndex = index;
      updatePlaystationContent(index);
      updateThumbnailStyles();
      activateConsoleImage(index);
    });

    thumbnailPlay.appendChild(imgThumb);
  });
}

function activateConsoleImage(index) {
  // Seleciona o elemento da imagem principal
  const consoleImage = document.getElementById("console-image");

  // Atualiza o src e o alt dinamicamente baseado no índice
  const thumb = playstationThumbnails[index];
  consoleImage.src = thumb.src;
  consoleImage.alt = thumb.alt;

  // Remove e adiciona a classe para reiniciar a transição
  consoleImage.classList.remove("active"); // Remove a classe anterior
  void consoleImage.offsetWidth; // Reinicia o estado do elemento (hack de CSS para transições)
  consoleImage.classList.add("active"); // Adiciona a classe ativa
}

// Exemplo: ativa a transição ao clicar
document.querySelector("#thumbnail-play").addEventListener("click", () => {
  activateConsoleImage();
});

createPlaystationThumbs(); // Inicializa thumbnails



