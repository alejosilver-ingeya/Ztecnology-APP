import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

interface User extends Model {
    names: string,
    email: string,
    password: string,
    phone: string,
    area: string,
    idRol: number,
    blocked: boolean,
    failedLogin: number,
    lastFailedLogin: Date,
    createdAt: Date,
    updatedAt: Date
}

const User = db.define<User>('User', {
    names: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    area: {
        type: DataTypes.STRING
    },
    blocked: {
        type: DataTypes.BOOLEAN
    },
    failedLogin: {
        type: DataTypes.INTEGER
    },
    lastFailedLogin: {
        type: DataTypes.DATE
    },
    state: {
        type: DataTypes.TINYINT
    },
    idRol: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
},
    {
        tableName: 'Users',
        timestamps: false
    })

export default User;