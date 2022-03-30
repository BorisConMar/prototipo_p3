import { OrdenGeneral, OrdenServicio, DetalleOrdenServicio, Detalle } from "./../modelos/index"

// lista
const index = async (req, res) => {
    try {
        const datos = await OrdenServicio.findAll();
        res.json(datos);

    } catch (error) {
        res.json({mensaje: "Ocurrió un error al recuperar los Ordengenerals"});
    }
}

//crear (cargar el formulario de creacion)
//const create

//guardar
const store = async (req, res) => {
    try {
        let ped = await OrdenServicio.create(req.body);
        res.json({mensaje: "Orden de servicio registrado", dato: ped});

    } catch (error) {
        res.json({mensaje: "Ocurrio un problema al crear el Ordendeservicio"});
    }
}

//mostrar
const show = async (req, res) => {
    try {

    } catch (error) {

    }
}

// editar (carga el formulario de edicion)
//const edit 

//modificar 
const update = async (req, res) => {
    try {

    } catch (error) {

    }
}

//eliminar
const destroy = async (req, res) => {
    try {

    } catch (error) {

    }
}

const reg_ordenservicio = async (req, res) => {
    try {
        //Verificar el usuario actual
        var id_ordengeneral = req.params.id;
        const orden_general_id = await OrdenGeneral.findOne({where: {id: id_ordengeneral}});
        //Primero obtener el (id_persona) o id_usuario
        //let persona_id = req.body.persona_id;  // obtener de la sesion actual
        //const orden_id = orden_general_id.codigo_ordeng
        //Procesar los datos y validar
       // let ordens = 
        let ordens_registrada = await OrdenServicio.create({
            codigo_orden_servicio: req.body.codigo_orden_servicio,
            descripcion_servicio: req.body.descripcion_servicio,
            prendas: req.body.prendas, // generar fecha y hora del servidor // modificar una vez que se registre el producto
            plazo_entrega: req.body.plazo_entrega, // cambiar cuando se culmine el pedido
            taller_id: req.body.taller_id,
            orden_general_id: id_ordengeneral,
            detalle: [
                {tipo_prenda: "chamarra", talla_prenda: "XL", cantidad_talla: 56},
                {tipo_prenda: "chamarra", talla_prenda: "XL", cantidad_talla: 56}
            ]
        },{
            include: [{
                model: Detalle,
                as: 'detalle'
            }]
        });
       /* var id_pedido = req.params.id;
        const ped = await Pedido.findOne({where: {id: id_pedido}});
        console.log("Llegandooo", ped)
        const prod = await Producto.create({titulo: "Producto prueba", precio: 100, cantidad: 5});
        const prod2 = await Producto.create({titulo: "Producto prueba 2", precio: 150, cantidad: 15});

        await ped.addProducto(prod);
        await ped.addProducto(prod2);
        let pedido = await Pedido.create(ped);

        const result = await Pedido.findOne({
            where: { id: id_pedido },
            include: Producto
        let lista_productos = req.body.productos;*/
        /* Recorriendo y registrando los productos a un pedido
        let detalle_servicio = req.body.orden_servicio;
        / Recorriendo y registrando los productos a un pedido
        detalle_servicio.forEach(async (prod) => {

            const producto = await Producto.findOne({where: {id: prod}});
            //verificamos la disponibilidad del producto

            // agreamos el producto a la tabla relacion (n:m) (carrito)
            await pedido.addProducto(producto); 

        res.json({mensaje: "Pedido registrado correctamente"})        
                */
    } catch (error) {
        console.log(error)
        res.json({mensaje: "Ocurrio un problema al realizar el pedido", mensaje2: error.message}) 
    }  

}

module.exports = {
    index,
    store,
    update,
    show,
    destroy,
    reg_ordenservicio
}