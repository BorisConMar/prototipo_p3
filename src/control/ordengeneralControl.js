import {OrdenGeneral} from './../modelos/index'


const listar = async (req, res) => {
    try{
        let datos = await OrdenGeneral.findAll();
        res.json(datos);
    }catch(err) {
        console.log(err);
        res.json({mensaje: "Ocurrio un problema al listar los OrdenGenerales"}); 
    }
}

const guardar = async (req, res) => {
    try {
        let OrdenGenerales = await OrdenGeneral.create(req.body);
        res.json({mensaje: "OrdenGeneral registrado", dato: OrdenGenerales});
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el OrdenGeneral"});
    }
}

const mostrar = async (req, res) => {
    try {
        let id = req.params.id;
        let OrdenGeneralid = await OrdenGeneral.findOne({
            where: {
                id
            }
        });
        res.json(OrdenGeneralid);
    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al buscar el OrdenGeneral"});
    }
}
const modificar = async (req, res) =>{
    // Validar antes de guardar
    try {
        let id = req.params.id;
        let respuesta = await OrdenGeneral.update(req.body, {where: {id: id}});
        res.json({mensaje: "OrdenGeneral Modificado"});
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al modificar el OrdenGeneral"});
    }
}

const eliminar = async (req, res) => {
    try {
        let OrdenGeneralid = req.params.id;
        await OrdenGeneral.destroy({
            where: {
              id: OrdenGeneralid
            }
          });
          res.json({mensaje: "OrdenGeneral eliminado"});

    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al modificar el OrdenGeneral"});
    }
}

module.exports = {
    listar,
    guardar,
    mostrar,
    modificar,
    eliminar
}
