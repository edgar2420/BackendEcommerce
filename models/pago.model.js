module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define("pago", {
        metodoPago: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.ENUM("exitoso", "fallido", "pendiente"),
            defaultValue: "pendiente" // Estado inicial del pago
        },
        transaccionId: {
            type: Sequelize.STRING,
        },
        
        pedidoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Pedidos', 
                key: 'id'
            },
            allowNull: false, // Es obligatorio tener un pedido asociado a un pago
        }
    });

    
    Pago.associate = models => {
        Pago.belongsTo(models.Pedido, {
            foreignKey: 'pedidoId',
            as: 'pedido'
        });
    };

    return Pago;
};
