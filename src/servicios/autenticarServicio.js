const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Usuario } = require("./../modelos/index")
const config = require("./../config/config")

const login = async (datos) => {
    const user = await Usuario.findOne({
        where: {
            correo: datos.correo
        },
        raw: true
    });
    if(!user){
        throw new Error('Usuario no encontrado');
    }
    // verificar la contraseña
    if(!bcrypt.compareSync(datos.password, user.password)){
        throw new Error('Contraseña Incorrecta');
    }
    // Generar el token (Autenticacion basada en tokens)
    const payload = {
        correo: user.correo,
        id: user.id,
        time: new Date(),
        tiempo_exp: config.tiempo_exp
    }

    var token = jwt.sign(payload, config.clave_secreta, {
        expiresIn: config.tiempo_exp
    });


    return {token: token, usuario: payload};
}

module.exports = {
    login
} 