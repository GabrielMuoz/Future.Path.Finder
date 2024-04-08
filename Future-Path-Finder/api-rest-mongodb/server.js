const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

mongoose.connect('mongodb+srv://root:Desarrollo@futurepathfindercluster.jutfoen.mongodb.net/fpf', {
  dbName: 'fpf',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

const preguntaSchema = new mongoose.Schema({
  pregunta: String,
  opciones: [
    {
      texto: String,
      correcta: Boolean
    }
  ],
  area: String
});

const carreraSchema = new mongoose.Schema({
  // Define los campos de tu documento de Carrera
  nombre: String,
  // etc...
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema, 'test');
const Carrera = mongoose.model('Carrera', carreraSchema, 'carreras'); 

app.get('/api/carreras', async (req, res) => {
  try {
    const carreras = await Carrera.find();
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/test', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido a Future Path Finder!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});