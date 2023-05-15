import "reflect-metadata"
import { DataSource } from "typeorm"
import { Haz } from "./entity/Haz"
import { Product } from "./entity/Product"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "szalo",
    synchronize: true,
    logging: false,
    entities: [User, Haz, Product],
    migrations: [],
    subscribers: [],
})
