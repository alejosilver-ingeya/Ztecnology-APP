import { DataTypes } from "sequelize";
import db from "../db/connection";

const Role = db.define('Roles',{
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
})

export default Role;