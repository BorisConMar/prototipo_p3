// importar el model
const bcrypt = require('bcrypt');
const {Usuario} = require("./../modelos/index");

const config = require("./../config/config")
// Metodos de logica

const nuevoUsuario = async function(req, res){
    //validar

    //gardar
    const datos = await Usuario.create(req.body);
    console.log("auto-generated ID:", datos.id);
    res.json({mensaje: "usuario registrado", data: datos})
}
const nuevoUsuario2 = async function(req, res){
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    if(nombre && correo && req.body.password){
        try{
        const user = await Usuario.findOne({where: {correo}});
        const user2 = await Usuario.findOne({where: {nombre}});
        if(user){
                console.log("*************** USUARIO EXISTE ******** ")
                res.json({mensaje: "El correo ya existe en la base de Datos"})

        }
        else if(user2){
                console.log("*************** USUARIO EXISTE ******** ")
                res.json({mensaje: "El nombre ya existe en la base de Datos"})
        }
        else{
                console.log("*************** USUARIO NO EXISTE ******** ")

                var u = {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    password: bcrypt.hashSync(req.body.password, config.salt_rounds),
                    tipo_usuario: req.body.tipo_usuario
                }
                const dato = await Usuario.create(u);
                res.json({mensaje: "usuario registrado", data: dato})

        }
    }catch(error){
        res.json({mensaje: "Ocurrió un problema al registrar el usuario", mensaje:error.message})

    }

    }else{
        res.json({mensaje: "Los campos correo o password son obligatorios"})
    }

}

// exportar los metodos
module.exports = {
    nuevoUsuario,
    nuevoUsuario2
} 