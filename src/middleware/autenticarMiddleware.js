const jwt = require("jsonwebtoken");
const config =require("./../config/config")

const verificaAutenticacion = async (req, res, next) => {
    // Condición 
    let token = null;
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        //console.log(token)
    }

    if(!token){
        res.status(403).send({
            auth: false, 
            mensaje: 'No se proporcionó el Token de seguridad'
        });
    }

    //Verificamos el Token
    jwt.verify(token, config.clave_secreta, (error, decoded) => {
        if(error){
            res.status(500).send({
                auth: false, 
                mensaje: 'Error de Authenticación'
            });
        }
        next();
    })    
}


module.exports={
    verificaAutenticacion
} 