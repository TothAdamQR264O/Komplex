import "reflect-metadata"
import { DataSource } from "typeorm"
import { Berlo } from "./entity/Berlo"
import { Foberlo } from "./entity/Foberlo"
import { Haz } from "./entity/Haz"
import { Szoba } from "./entity/Szoba"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Haz, Foberlo, Szoba, Berlo],
    migrations: [],
    subscribers: [],
})
