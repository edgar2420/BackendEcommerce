module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        descripcion: {
            type: Sequelize.TEXT,
        },
        precio: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        imagenUrl: {
            type: Sequelize.STRING,
        },
        usuarioId: { // Clave foránea para el usuario
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Producto;
};
