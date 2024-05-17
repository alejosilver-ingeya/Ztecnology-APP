import { DataTypes } from "sequelize";
import db from "../db/connection";

const City = db.define('City',{
    name: {
        type: DataTypes.STRING
    }
})

export default City;