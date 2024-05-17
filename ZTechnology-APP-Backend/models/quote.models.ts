import { DataTypes } from "sequelize";
import db from "../db/connection";

const Quote = db.define('Quote',{
    number: {
        type: DataTypes.STRING
    },
    yearQuote: {
        type: DataTypes.DATE
    },
    dateQuote: {
        type: DataTypes.DATE
    },
    idCustomer: {
        type: DataTypes.INTEGER
    },
    idProduct: {
        type: DataTypes.INTEGER
    },
    stock: {
        type: DataTypes.INTEGER
    },
    total: {
        type: DataTypes.DECIMAL
    },
    priceTotal: {
        type: DataTypes.DECIMAL
    },
    idUser: {
        type: DataTypes.INTEGER,
    },
    discount: {
        type: DataTypes.DECIMAL
    },
    percentageDiscount: {
        type: DataTypes.DECIMAL
    },
    idStateQuote: {
        type: DataTypes.INTEGER
    }
})

export default Quote;