const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd1', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize 