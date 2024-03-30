const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el paquete Cors para permitir solicitudes entre dominios

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://root:Desarrollo@futurepathfindercluster.jutfoen.mongodb.net/fpf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'fpf'
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Define el esquema de las carreras
const carreraSchema = new mongoose.Schema({
  area: String,
  carreras: [String] // Tipo de datos array de strings para carreras
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

// Ruta para la raíz del sitio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a Future Path Finder!');
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
