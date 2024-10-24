var jwt = require("jwt-simple");
var moment = require("moment");
var secret = 'utzac_ti';

exports.createToken = function(user){
    var payload = {
        sub:user.idusers,
        role:user.role,
        name:user.name,
        iat:moment().unix(),
        exp:moment().add(60, 'minute').unix()
    }
    return jwt.encode(payload, secret);
}