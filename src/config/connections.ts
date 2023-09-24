import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbDatabase = process.env.DB_DATABASE as string;
const dbHost = process.env.DB_HOST as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbDialect = "postgres";

const sequelizeConnection = new Sequelize(dbDatabase, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;
