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
        file = data.file;
        duration = data.duration;
        idalbum = data.idalbum;
        var sql = 'INSERT INTO canciones(name, file, duration, albums_idalbums) VALUES ("' + name + '", "' + file + '", "' + duration + '", "' + idalbum + '")';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(201).send({message: 'Canción creada'})
            }
        });
    },

    update(req, res){
        data = req.body;
        name = data.name;
        file = data.file;
        duration = data.duration;
        idalbum = data.idalbum;
        id = data.id;
        var sql = 'UPDATE canciones SET name = "' + name + '", file = "' + file + '", duration = "' + duration + '", albums_idalbums = "' + idalbum + '" WHERE idcanciones = ' + id + '';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(200).send({message: 'Canción modificada'})
            }
        });
    },

    delete(req, res){
        data = req.body;
        id = data.id;
        var sql = 'DELETE FROM albums WHERE idalbums = ' + id + '';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(200).send({message: 'Álbum eliminado'})
            }});
    },

    getAll(req, res){
        var sql = 'SELECT * FROM albums';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde');
            } else{
                console.log(results);
                res.status(201).send({data:results});
            }});
    }
} 