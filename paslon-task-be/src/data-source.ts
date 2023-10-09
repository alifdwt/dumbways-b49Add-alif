import "reflect-metadata";
import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";

// dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "h1st0r10gr4f1",
  database: "testTypeORM2",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
