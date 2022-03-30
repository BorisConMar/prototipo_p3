const inicio_control = require("../control/iniciocontrol");
const usuario_control = require("./../control/usuarioControl");
const autenticacion_control = require("./../control/autenticarControl")
import tallerControl from "./../control/tallerControl";
import ordengeneralControl from "./../control/ordengeneralControl";
import ordenservicioControl from "./../control/ordenservicioControl";
import autenticarMiddleware from "./../middleware/autenticarMiddleware";

function adicionar(app){

    app.get("/", inicio_control.inicio);

    //saludar
    app.get("/saludo", inicio_control.saludo);
    //rutas para usuario
    app.post("/usuario", usuario_control.nuevoUsuario);//promesas
    app.post("/usuario2", usuario_control.nuevoUsuario2);//async await
    app.post("/login", autenticacion_control.ingresar);
    //rutas  de talleres
    // app.get("/taller", tallerControl.listar);
    // app.post("/taller", tallerControl.guardar);
    // app.get("/taller/:id", tallerControl.mostrar);
    // app.put("/taller/:id", tallerControl.modificar);
    // app.delete("/persona/:id", tallerControl.eliminar);

    app.get("/taller", autenticarMiddleware.verificaAutenticacion, tallerControl.listar);
    app.post("/taller", autenticarMiddleware.verificaAutenticacion, tallerControl.guardar);
    app.get("/taller/:id", autenticarMiddleware.verificaAutenticacion, tallerControl.mostrar);
    app.put("/taller/:id", autenticarMiddleware.verificaAutenticacion, tallerControl.modificar);
    app.delete("/persona/:id", autenticarMiddleware.verificaAutenticacion, tallerControl.eliminar);
    //rutas de ordengeneral
    //app.get("/ordeng", ordengeneralControl.listar);
    //app.post("/ordeng", ordengeneralControl.guardar);
    //app.get("/ordeng/:id", ordengeneralControl.mostrar);
    //app.put("/ordeng/:id", ordengeneralControl.modificar);
    //app.delete("/ordeng/:id", ordengeneralControl.eliminar);

    app.get("/ordeng", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.listar);
    app.post("/ordeng", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.guardar);
    app.get("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.mostrar);
    app.put("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.modificar);
    app.delete("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.eliminar);

    app.get("/ordens", autenticarMiddleware.verificaAutenticacion, ordenservicioControl.index);
    app.post("/ordens", autenticarMiddleware.verificaAutenticacion, ordenservicioControl.store);
    //app.get("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.);
    //app.put("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.modificar);
    //app.delete("/ordeng/:id", autenticarMiddleware.verificaAutenticacion, ordengeneralControl.eliminar);
    app.post("/ordens/:id", autenticarMiddleware.verificaAutenticacion, ordenservicioControl.reg_ordenservicio);
}

module.exports = {
    adicionar
}