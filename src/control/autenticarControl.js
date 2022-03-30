const autenticarServicio = require("./../servicios/autenticarServicio")

const ingresar = async (req, res) => {
    //res.send("iniciado sesion...");
    try{
        const datos = await autenticarServicio.login(req.body);
        res.send({
            success: true,
            data: {datos}
        });
    }catch(error){
        res.send({
            success: false,
            mensaje: error.message
        });
    }
}

module.exports = {
    ingresar
};