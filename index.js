const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const db = require("./models");


// Cargar variables del entorno
dotenv.config();

const app = express();
const port = process.env.PORT;

// Configuración de CORS
const corsOptions = {
  origin: 'https://6895-177-222-108-82.ngrok-free.app/',  // Permitir solicitudes desde localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permitir los métodos HTTP necesarios
  allowedHeaders: ['Content-Type', 'Authorization'],  // Permitir los encabezados necesarios
};
app.use(cors(corsOptions));
// Hacer que el directorio "uploads" sea accesible públicamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



// Sincronizar la base de datos
db.sequelize.sync().then(() => {
    console.log("db resync");
});

// Rutas
require("./routes")(app);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = {
    app,
    upload
};
