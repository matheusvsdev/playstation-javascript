// Importa os módulos necessários
const express = require("express"); // Framework para criar APIs
const path = require("path"); // Módulo para manipular caminhos de arquivos
const mongoose = require("mongoose"); // Biblioteca para interagir com o MongoDB
const cors = require("cors"); // Middleware para habilitar CORS
const imageRoutes = require("./routes/imageRoutes"); // Rotas da API para imagens
const Image = require("./models/Image"); // Modelo do MongoDB
const fs = require("fs"); // Módulo para manipular o sistema de arquivos

// Cria a aplicação Express
const app = express();

// Configura o middleware para CORS e JSON
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Serve a pasta de imagens como arquivos estáticos
app.use("/images", express.static(path.join(__dirname, "../frontend/img")));

// Configura a conexão com o MongoDB
mongoose
  .connect("mongodb://localhost:27017/playstation", {
    useNewUrlParser: true, // Parâmetro legado, pode ser removido em versões futuras
    useUnifiedTopology: true, // Parâmetro legado, pode ser removido em versões futuras
  })
  .then(() => console.log("Conectado ao MongoDB")) // Mensagem de sucesso
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error)); // Mensagem de erro

// Usa as rotas definidas para manipulação de imagens
app.use("/api", imageRoutes); // Prefixa as rotas com /api

// Define a porta e inicia o servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// ** Função para salvar imagens automaticamente no banco de dados **

// Caminho para a pasta de imagens
const imgFolderPath = path.join(__dirname, "../frontend/img");

// Lista de imagens permitidas (apenas esses arquivos serão salvos)
const allowedImages = ["assassins.jpg", "death.jpg", "forza.jpg", "nightmares.jpg", "split.jpg"];

function saveImagesToDatabase() {
  // Lê os arquivos da pasta de imagens
  fs.readdir(imgFolderPath, async (err, files) => {
    if (err) {
      console.error("Erro ao ler a pasta de imagens:", err); // Loga o erro
      return;
    }

    // Itera sobre os arquivos encontrados na pasta
    for (const file of files) {
      if (allowedImages.includes(file)) {
        try {
          // Verifica se a imagem já existe no banco
          const existingImage = await Image.findOne({ name: file });
          if (!existingImage) {
            // Cria um novo documento para a imagem
            const newImage = new Image({
              name: file, // Nome do arquivo da imagem
              imageUrl: `http://localhost:5001/images/${file}`, // URL para acessar a imagem
              description: "Imagem permitida adicionada automaticamente", // Descrição genérica
            });
            await newImage.save(); // Salva o documento no banco
            console.log(`Imagem salva no banco: ${file}`);
          } else {
            console.log(`Imagem já existente no banco: ${file}`);
          }
        } catch (error) {
          console.error("Erro ao salvar imagem no banco:", error);
        }
      } else {
        console.log(`Imagem ignorada (não permitida): ${file}`);
      }
    }
  });
}

// Chama a função ao iniciar o servidor para garantir que as imagens sejam salvas
saveImagesToDatabase();
