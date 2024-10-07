const express = require('express'); //servidor web
const app = express(); 
const logger = require('morgan'); //logger
require('dotenv').config();
const PORT = process.env.PORT; //Puerto de la app
const conn = require('mysql2'); //Para usar BD
const bodyParser = require('body-parser'); //Ordenar información
const cors = require('cors'); //Permitir peticiones

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
app.get('/users', (req, res)=>{
    res.send({message:'Aquí se muestran los usuarios'});
});

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