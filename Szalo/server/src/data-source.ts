import "reflect-metadata"
import { DataSource } from "typeorm"
import { Berlo } from "./entity/Berlo"
import { Foberlo } from "./entity/Foberlo"
import { Haz } from "./entity/Haz"
import { Szoba } from "./entity/Szoba"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "szalo",
    synchronize: true,
    logging: false,
    entities: [Haz, Foberlo, Szoba, Berlo],
    migrations: [],
    subscribers: [],
})
