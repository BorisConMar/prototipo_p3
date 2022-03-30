const {User, Categoria} = require("../modelos/index")

const inicio = (req, res) => {
    res.send("Hola Mundo desde el controlador");
}

const saludo =  (req, res) => {
    res.send("Hola Mundo desde la segunda ruta!!");
}

module.exports = {
    inicio,
    saludo
} 