// Importa o Express para gerenciar rotas e requisições
const express = require("express");
const router = express.Router();

// Importa o modelo do Mongoose para a coleção de imagens no MongoDB
const Image = require("../models/Image");

// Rota GET para buscar imagens específicas com base em parâmetros
router.get("/bannerImages", async (req, res) => {
  try {
    // Obtém os nomes das imagens da query string
    const { images } = req.query;

    // Verifica se os parâmetros foram fornecidos
    if (!images) {
      return res
        .status(400)
        .json({ error: "Nenhum parâmetro de imagens fornecido." });
    }

    // Divide a string de imagens em um array (separado por vírgulas)
    const imageNames = images.split(",");

    // Busca no banco de dados somente as imagens que correspondem aos nomes fornecidos
    const filteredImages = await Image.find({ fileName: { $in: imageNames } });

    // Mapeia as imagens para incluir URLs
    const imagesWithUrl = filteredImages.map((image) => ({
      fileName: image.fileName, // Nome do arquivo
      url: `http://localhost:5001/images/${image.fileName}`, // Gera a URL com base no nome do arquivo
      description: image.description, // Descrição da imagem
    }));

    // Retorna o array filtrado em formato JSON
    res.status(200).json(imagesWithUrl);
  } catch (error) {
    // Responde com status 500 em caso de erro
    console.error("Erro ao buscar imagens específicas:", error);
    res.status(500).json({ error: "Erro ao buscar imagens." });
  }
});

// Rota POST para adicionar uma nova imagem ao banco de dados
router.post("/images", async (req, res) => {
  try {
    // Extrai os campos do corpo da requisição
    const { fileName, imageUrl, description } = req.body;

    // Cria uma nova instância do modelo "Image"
    const newImage = new Image({ fileName, imageUrl, description });

    // Salva o novo documento no MongoDB
    const savedImage = await newImage.save();

    // Retorna o documento salvo em formato JSON
    res.status(201).json(savedImage);
  } catch (error) {
    // Responde com status 500 em caso de erro e exibe uma mensagem
    console.error("Erro ao salvar imagem:", error);
    res.status(500).json({ error: "Erro ao salvar imagem." });
  }
});

// Exporta o roteador para que ele possa ser usado no app principal
module.exports = router;
