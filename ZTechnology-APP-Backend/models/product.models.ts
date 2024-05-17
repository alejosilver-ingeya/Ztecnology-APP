import { DataTypes } from "sequelize";
import db from "../db/connection";

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    priceUnit: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.TINYINT
    }
})

export default Product;