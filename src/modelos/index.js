const {Sequelize, DataTypes} = require("sequelize");
const db = require("./../database/db");


const Usuario = db.define('Usuario', {
    nombre: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: "El nombre no debe ir vacio"
            }
        },
        unique: {
           args: true,
           msg: "El nombre ya existe" 
        },
    },
    correo: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                msg: "El campo correo debe ser valido"
            },
            notEmpty: {
                msg: "El correo no debe ir vacio"
            }
        },
        unique: {
           args: true,
           msg: "El correo ya existe" 
        },
    },
    password: {
        type: Sequelize.STRING, 
        validate: {
            max: 20            
        }
    },
    tipo_usuario: {
        type: Sequelize.STRING, 
        validate: {
            max: 20            
        }
    }},{
    timestamps: true
})


const OrdenGeneral = db.define("OrdenGeneral", {
    codigo_ordeng: {type: Sequelize.STRING(30), allowNull: false},
    descripcion_general: {type: Sequelize.STRING(200), allowNull: false},
    prendas: {type: Sequelize.STRING(200), allowNull: false},
    tallas: {type: Sequelize.STRING(50), allowNull: false},
    plazo_entrega: DataTypes.DATE,
    item_total: {type: Sequelize.INTEGER(12), allowNull: true},
    total_talleres: {type: Sequelize.INTEGER(12), allowNull: true}})


const Taller = db.define("Taller", {
    codigo_taller: {type: Sequelize.STRING(30), allowNull: false},
    nombre_taller: {type: Sequelize.STRING(40), allowNull: false},
    nombre_propietario: {type: Sequelize.STRING(50), allowNull: false},
    ubicacion: {type: Sequelize.STRING(200), allowNull: false},
    fecha_registro: DataTypes.DATE,
    telefono_propietario: {type: Sequelize.INTEGER(20), allowNull: false},
    telefono_responsable: {type: Sequelize.INTEGER(20), allowNull: true},
    capacidad_produccion: {type: Sequelize.INTEGER(12), allowNull: true}})

const OrdenServicio = db.define("OrdenServicio", {
    codigo_orden_servicio: {type: Sequelize.STRING(30), allowNull: false},
    descripcion_servicio: {type: Sequelize.STRING(200), allowNull: false},
    prendas: {type: Sequelize.STRING(200), allowNull: false},
    plazo_entrega: DataTypes.DATE,
    taller_id: {type: Sequelize.INTEGER, references: {model: Taller, key: 'id'}},
    orden_general_id: {type: Sequelize.INTEGER, references: {model: OrdenGeneral, key: 'id'}}
})
OrdenGeneral.hasMany(OrdenServicio, {foreignKey: 'orden_general_id'})

Taller.hasMany(OrdenServicio, {foreignKey: 'taller_id'})

const DetalleOrdenServicio = db.define("DetalleOrdenServicio", {
    tipo_prenda: {type: Sequelize.STRING(200), allowNull: false},
    talla_prenda: {type: Sequelize.STRING(10), allowNull: false},
    cantidad_talla: {type: Sequelize.INTEGER(10), allowNull: true},
    //orden_servicio_id: {type: Sequelize.INTEGER, references: {model: OrdenServicio, key: 'id'}}
})


const Detalle = OrdenServicio.hasMany(DetalleOrdenServicio, {as: 'detalle'});


const RegistroContenedor = db.define("RegistroContenedor", {
    tipo_contenedor: {type: Sequelize.STRING(30), allowNull: false},
    taller_id:  {type: Sequelize.INTEGER, references: {model: Taller, key: 'id'}},
    orden_servicio_id: {type: Sequelize.INTEGER, references: {model: OrdenServicio, key: 'id'}},
    usuario_id: {type: Sequelize.INTEGER, references: {model: Usuario, key: 'id'}},
    prendas: {type: Sequelize.STRING(50), allowNull: false},
    codigo_contenedor: {type: Sequelize.STRING(50), allowNull: false},
    Peso_contenedor: {type: Sequelize.FLOAT(10), allowNull: true},
    numero_empaques: {type: Sequelize.INTEGER(10), allowNull: true},
    varias_tallas:  {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false},
    fecha_pesaje: DataTypes.DATE,
    cantidad_item: {type: Sequelize.INTEGER(10), allowNull: true}
})

const DetalleContenedor = db.define("DetalleContenedor", {
    tipo_prenda: {type: Sequelize.STRING(200), allowNull: false},
    talla_prenda: {type: Sequelize.STRING(10), allowNull: false},
    cantidad_talla: {type: Sequelize.INTEGER(10), allowNull: true},
    contenedor_id: {type: Sequelize.INTEGER, references: {model: RegistroContenedor, key: 'id'}}
})
RegistroContenedor.hasMany(DetalleContenedor, {foreignKey: 'orden_servicio_id'})

    module.exports = {
    Usuario,
    OrdenGeneral,
    Taller,
    OrdenServicio,
    DetalleOrdenServicio,
    RegistroContenedor,
    DetalleContenedor,
    Detalle
} 