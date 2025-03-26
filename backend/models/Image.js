// Importa o mongoose, uma biblioteca para conectar e interagir com o MongoDB
const mongoose = require("mongoose");

// Define o esquema para o modelo de imagens
const imageSchema = new mongoose.Schema(
  {
    // Nome do arquivo da imagem (campo obrigatório)
    fileName: {
      type: String, // Tipo do dado: String
      required: [true, "O nome da imagem é obrigatório"], // Mensagem de validação personalizada
      trim: true, // Remove espaços em branco no início e no final
    },
    // URL da imagem para acesso (campo opcional)
    imageUrl: {
      type: String, // Tipo do dado: String
      trim: true, // Remove espaços desnecessários
      validate: {
        validator: function (url) {
          // Valida se o valor é uma URL válida usando regex básica
          return /^https?:\/\/.+\..+$/.test(url);
        },
        message: "URL inválida para a imagem", // Mensagem de erro personalizada
      },
    },
    // Descrição da imagem (campo opcional)
    description: {
      type: String, // Tipo do dado: String
      maxlength: [200, "A descrição não pode exceder 200 caracteres"], // Valida tamanho máximo
      trim: true, // Remove espaços desnecessários
    },
  },
  {
    timestamps: true, // Adiciona campos automáticos "createdAt" e "updatedAt"
  }
);

// Middleware (pré-save) para fazer algo antes de salvar a imagem no banco
imageSchema.pre("save", function (next) {
  console.log(`Salvando a imagem: ${this.fileName}`); // Loga uma mensagem no console antes de salvar
  next(); // Continua para o próximo middleware ou salva o documento
});

// Exporta o modelo com base no esquema definido
module.exports = mongoose.model("Image", imageSchema);
