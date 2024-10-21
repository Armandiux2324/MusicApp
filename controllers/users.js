const conn = require('mysql2'); //Para usar BD
var bcrypt = require('bcrypt-nodejs');

const conexion = conn.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
});

module.exports={

    login(req, res){
        var data = req.body;
        var username = data.username;
        var password = data.password;
        conexion.query('SELECT * FROM users WHERE username = "' + username + '"', function(error, results, fields){
            if(!error){
                if(results.length == 1){
                    bcrypt.compare(password, results[0].password, function(error, check){
                        if(check){
                            console.log("Datos correctos");
                            res.status(200).send({message: "Login exitoso"});
                        } else{
                            res.status(200).send({message: "Verifica tu información"});
                        }
                    });
                } else{
                    console.log("Datos incorrectos");
                    res.status(200).send({message: "Verifica tu información"});
                }
            } else{
                console.log(error);
                console.log("Datos incorrectos");
                res.status(200).send({message: "Verifica tu información"});
            }
        });
    },

    save(req, res){
        data = req.body;
        name = data.name;
        username = data.username;
        password = data.password;
        email = data.email;
        role = "usuario";
        bcrypt.hash(password, null, null, function(error, hash){
            if(error){
                console.log(error);
                res.status(500).send({message: 'Intenta más tarde'});
            } else{
                password = hash;
                var sql = 'INSERT INTO users(name, username, password, email, role) VALUES ("' + name + '", "' + username + '", "' + password + '", "' + email + '", "' + role + '")';
                conexion.query(sql, function(err, results, fields){
                    if(err){
                        console.log(err);
                        res.status(500).send('Intenta más tarde')
                    } else{
                        console.log(results);
                        res.status(201).send({message: 'Usuario creado'})
                    }
                });
            }
        });
    },

    update(req, res){
        data = req.body;
        name = data.name;
        username = data.username;
        password = data.password;
        email = data.email;
        role = data.role;
        id = data.id;
        var sql = 'UPDATE users SET name = "' + name + '", username = "' + username + '", password = "' + password + '", email = "' + email + '", role = "' + role + '" WHERE idusers = ' + id + '';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(200).send({message: 'Usuario modificado'})
            }
        });
    },

    delete(req, res){
        data = req.body;
        id = data.id;
        var sql = 'DELETE FROM users WHERE idusers = ' + id + '';
        conexion.query(sql, function(err, results, fields){
            if(err){
                console.log(err);
                res.status(500).send('Intenta más tarde')
            } else{
                console.log(results);
                res.status(200).send({message: 'Usuario eliminado'})
            }});
    },

    getAll(req, res){
        var sql = 'SELECT * FROM users';
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