import "reflect-metadata"
import { DataSource } from "typeorm"
import { Berlo } from "./entity/Berlo"
import { Foberlo } from "./entity/Foberlo"
import { Haz } from "./entity/Haz"
import { Szerzodes } from "./entity/Szerzodes"
import { Jelentkezes } from "./entity/Jelentkezes"
import { Esemeny } from "./entity/Esemeny"
import { Haviosszesito } from "./entity/Haviosszesito"
import { OsszesitoTetel } from "./entity/OsszesitoTetel"
import { SzamlazzHuIntegracio } from "./entity/SzamlazzHuIntegracio"
import 'dotenv/config'
import { Szamla } from "./entity/Szamla"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Haz, Foberlo, Szerzodes, Berlo, Jelentkezes, Esemeny, Haviosszesito, OsszesitoTetel, SzamlazzHuIntegracio, Szamla],
    migrations: [],
    subscribers: [],
})
