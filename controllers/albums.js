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
        songs = data.songs;
        idartista = data.idartista;
        var sql = 'INSERT INTO albums(name, imagen, songs, artista_idartista) VALUES ("' + name + '", "' + imagen + '", "' + songs + '", "' + idartista + '")';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(201).send({message: 'Álbum creado'})
            }
        });
    },

    update(req, res){
        data = req.body;
        name = data.name;
        imagen = data.imagen;
        songs = data.songs;
        idartista = data.idartista;
        id = data.id;
        var sql = 'UPDATE albums SET name = "' + name + '", imagen = "' + imagen + '", songs = "' + songs + '", artista_idartista = "' + idartista + '" WHERE idalbums = ' + id + '';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(200).send({message: 'Álbum modificado'})
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