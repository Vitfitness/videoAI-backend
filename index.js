const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

// Definir modelo de Video en MongoDB
const VideoSchema = new mongoose.Schema({
  videoUrl: String,
  edits: Array,
});
const Video = mongoose.model("Video", VideoSchema);

// Ruta para procesar un video
app.post("/process-video", async (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: "Falta el enlace del video" });

  // Simulación de procesamiento (en el futuro aquí iría FFMPEG)
  const newVideo = new Video({ videoUrl, edits: ["Escalado a 720p"] });
  await newVideo.save();
  
  res.json({ message: "Video procesado", url: videoUrl });
});

// Iniciar servidor en puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
 
