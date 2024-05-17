import { DataTypes } from "sequelize";
import db from "../db/connection";

const QuoteDetail = db.define('QuoteDetail',{
    idQuote: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.DECIMAL
    },
    subtotal: {
        type: DataTypes.DECIMAL
    }
})

export default QuoteDetail;