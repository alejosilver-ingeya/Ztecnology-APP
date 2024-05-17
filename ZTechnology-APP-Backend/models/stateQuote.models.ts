import { DataTypes } from "sequelize";
import db from "../db/connection";

const StateQuote = db.define('StateQuote',{
    name: {
        type: DataTypes.STRING
    }
})

export default StateQuote;