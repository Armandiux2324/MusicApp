const conn = require('mysql2'); //Para usar BD

const conexion = conn.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
});

module.exports={
    save(req, res){
        data = req.body;
        name = data.name;
        imagen = data.imagen;
        var sql = 'INSERT INTO artista(name, imagen) VALUES ("' + name + '", "' + imagen + '")';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
            } else{
                console.log(results);
            }
        });
    },

    update(req, res){
        
    },

    delete(req, res){
        
    },

    getAll(req, res){
        
    }
} 