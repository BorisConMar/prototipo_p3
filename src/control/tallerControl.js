import {Taller} from './../modelos/index'


const listar = async (req, res) => {
    try{
        let datos = await Taller.findAll();
        res.json(datos);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al listar los talleres"}); 
    }
}

const guardar = async (req, res) => {
    try {
        let talleres = await Taller.create(req.body);
        res.json({mensaje: "taller registrado", dato: talleres});
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el taller"});
    }
}

const mostrar = async (req, res) => {
    try {
        let id = req.params.id;
        let tallerid = await Taller.findOne({
            where: {
                id
            }
        });
        res.json(tallerid);
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al buscar el taller"});
    }
}
const modificar = async (req, res) =>{
    // Validar antes de guardar
    try {
        let id = req.params.id;
        let respuesta = await Taller.update(req.body, {where: {id: id}});
        res.json({mensaje: "Taller Modificado"});
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al modificar el Taller"});
    }
}

const eliminar = async (req, res) => {
    try {
        let tallerid = req.params.id;
        await Taller.destroy({
            where: {
              id: tallerid
            }
          });
          res.json({mensaje: "Taller eliminado"});

    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al modificar el Taller"});
    }
}

module.exports = {
    listar,
    guardar,
    mostrar,
    modificar,
    eliminar
}
