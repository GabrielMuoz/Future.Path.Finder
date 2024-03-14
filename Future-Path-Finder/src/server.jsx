// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Conecta con la base de datos MongoDB
mongoose.connect('mongodb+srv://root:Desarrollo@futurepathfindercluster.jutfoen.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Define el esquema de las carreras
const carreraSchema = new mongoose.Schema({
  area: String,
  nombre: String,
  duracion: String
});

// Define el modelo de Carrera
const Carrera = mongoose.model('Carrera', carreraSchema);

// Ruta para obtener todas las carreras
app.get('/api/carreras', async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
