const express = require('express'); //servidor web
const app = express(); 
const logger = require('morgan'); //logger
require('dotenv').config();
const PORT = process.env.PORT; //Puerto de la app
const conn = require('mysql2'); //Para usar BD
const bodyParser = require('body-parser'); //Ordenar información
const cors = require('cors'); //Permitir peticiones
var md_auth = require('./middlewares/auth')

var artistaController = require('./controllers/artista');
var albumsController = require('./controllers/albums');
var cancionesController = require('./controllers/canciones');
var usersController = require('./controllers/users');

//Conectar a la base de datos
const conexion = conn.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
});

//Configurar servidor API
app.use(cors());
app.use(logger('dev')); //dev para debuggear para cuando estemos en modo desarrollo
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

//Crear endpoints 
//endpoints artista
app.post('/artista', [md_auth.Auth], artistaController.save);
app.get('/artista', [md_auth.Auth], artistaController.getAll);
app.delete('/artista', [md_auth.Auth], artistaController.delete);
app.put('/artista', [md_auth.Auth], artistaController.update);

//endpoints albums
app.post('/albums', albumsController.save);
app.put('/albums', albumsController.update);
app.delete('/albums', albumsController.delete);
app.get('/albums', albumsController.getAll);

//endpoints canciones
app.post('/canciones', cancionesController.save);
app.put('/canciones', cancionesController.update);
app.delete('/canciones', cancionesController.delete);
app.get('/canciones', cancionesController.getAll);

//endpoints users
app.post('/users', [md_auth.Auth], usersController.save);
app.put('/users', usersController.update);
app.delete('/users', usersController.delete);
app.get('/users', usersController.getAll);
app.post('/login', usersController.login);

app.get('*', (req, res)=>{
    res.send({message:'Ruta no válida'});
});

//Verificar la conexión a la DB
conexion.getConnection((error)=>{
    if(error){
        console.log("No se pudo conectar a la DB");
    } else{
        console.log("Conectado a la DB");
        app.listen(PORT, ()=>{
            console.log("Servidor API funcionando")
        });
    }
});