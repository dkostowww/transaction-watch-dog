module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        configuration_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        hash: {
            type: Sequelize.STRING(),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9a-f]{32}$/i
            }
        },
        nonce: {
            type: Sequelize.INTEGER(),
            allowNull: false
        },
        block_hash: {
            type: Sequelize.STRING(),
            allowNull: false,
            validate: {
                is: /^[0-9a-f]{32}$/i
            }
        },
        block_number: {
            type: Sequelize.INTEGER(),
            allowNull: false
        },
        transaction_index: {
            type: Sequelize.INTEGER()
        },
        from: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        to: {
            type: Sequelize.STRING()
        },
        value: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        gas_price: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        gas: {
            type: Sequelize.INTEGER(),
            allowNull: false
        },
        input: {
            type: Sequelize.STRING(),
            allowNull: false
        },
    },
    {
        timestamps: false
    });

    return Transaction;
}