const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://root:Desarrollo@futurepathfindercluster.jutfoen.mongodb.net/fpf', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir una ruta para la raíz del sitio
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
