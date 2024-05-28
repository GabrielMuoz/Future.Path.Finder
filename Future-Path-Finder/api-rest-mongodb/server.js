const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

require('dotenv').config();
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

app.post('/api/enviar-correo', upload.single('pdf'), async (req, res) => {
  const pdfFile = req.file; 
  const correoDestinatario = req.body.correoDestinatario;

  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'futurepathfinder161@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: '', 
    }
  }));

  const mailOptions = {
    from: 'futurepathfinder161@gmail.com',
    to: correoDestinatario,
    subject: 'Resultados del Test de tu examen vocacional STEM',
    text: 'Adjuntamos los resultados del Test en formato PDF.',
    attachments: [{
      filename: 'resultados_test.pdf',
      content: pdfFile.buffer,
      encoding: 'base64'
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo enviado correctamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Ocurrió un error al enviar el correo.');
  }
});

