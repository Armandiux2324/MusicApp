var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'utzac_ti';

exports.Auth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "Falta llave"})
    } 

    var token = req.headers.authorization.replace(/['"] + /g, '')
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'Sesión expirada.'});
        }
    } catch (error) {
        return res.status(404).send({message: 'Llave no válida.'});
    }   
    req.user = payload;
    next();
}