import { DataTypes } from "sequelize";
import db from "../db/connection";

const Customer = db.define('Customer',{
    document: {
        type: DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    idCitie: {
        type: DataTypes.INTEGER,
    },
    state: {
        type: DataTypes.TINYINT
    }
})

export default Customer;