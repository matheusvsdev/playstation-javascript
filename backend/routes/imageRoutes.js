// Importa o Express para gerenciar rotas e requisições
const express = require("express");
const router = express.Router();

// Importa o modelo do Mongoose para a coleção de imagens no MongoDB
const Image = require("../models/Image");

// Rota GET para buscar todas as imagens salvas no banco de dados
router.get("/images", async (req, res) => {
  try {
    // Busca todos os documentos na coleção "images"
    const images = await Image.find();

    // Cria um array de objetos contendo os dados e URLs das imagens
    const imagesWithUrl = images.map((image) => ({
      name: image.name, // Nome do arquivo
      url: `http://localhost:5001/images/${image.name}`, // Gera a URL com base no nome do arquivo
      description: image.description, // Descrição da imagem
    }));

    // Retorna o array em formato JSON como resposta
    res.status(200).json(imagesWithUrl);
  } catch (error) {
    // Responde com status 500 em caso de erro e exibe uma mensagem
    console.error("Erro ao buscar imagens:", error);
    res.status(500).json({ error: "Erro ao buscar imagens." });
  }
});

// Rota POST para adicionar uma nova imagem ao banco de dados
router.post("/images", async (req, res) => {
  try {
    // Extrai os campos do corpo da requisição
    const { name, imageUrl, description } = req.body;

    // Cria uma nova instância do modelo "Image"
    const newImage = new Image({ name, imageUrl, description });

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
