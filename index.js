const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect("mongosh "mongodb+srv://cluster0.mqrqndc.mongodb.net/" --apiVersion 1 --username financierosintegraless --password p8OLY1XAjKsxL9Hr", { useNewUrlParser: true, useUnifiedTopology: true });

const VideoSchema = new mongoose.Schema({
  videoUrl: String,
  edits: Array,
});
const Video = mongoose.model("Video", VideoSchema);

// Procesar video con FFMPEG
app.post("/process-video", async (req, res) => {
  const { videoUrl } = req.body;
  if (!videoUrl) return res.status(400).json({ error: "Falta el enlace del video" });

  exec(`ffmpeg -i ${videoUrl} -vf "scale=1280:720" output.mp4`, (error) => {
    if (error) return res.status(500).json({ error: "Error procesando el video" });

    // Guardar en la base de datos
    const newVideo = new Video({ videoUrl, edits: ["Scaled to 720p"] });
    newVideo.save();
    
    res.json({ message: "Video procesado", url: "output.mp4" });
  });
});

app.listen(5000, () => console.log("Backend en http://localhost:5000"));
