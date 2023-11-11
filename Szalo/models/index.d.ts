export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
    role: string;
    name: string;
}

export interface FoberloDTO {
    id: number;
    nev: string;
    email: string;
    password: string;
    szamlaszam: string;
    telefonszam: number;
    bank: string;
}

export interface HazDTO {
    id: number;
    hrsz: string;
    irsz: number;
    telepules: string;
    cim: string;
    rezsi: number;
    ar: number;
    szobakszama: number;
    meret: number;
    tulaj: FoberloDTO;
    allapot: string;
    komfort: string;
    emelet: number;
    szint: number;
    lift: string;
    legkondi: string;
    butorozott: string;
    koltozheto: string;
    minberido: number;
    fureswc: string;
    kilatas: string;
    erkelymeret: number;
    gepesitett: string;
    hirdet: string;
}


export interface BerloDTO {
    id: number;
    nev: string;
    email: string;
    password: string;
    telefonszam: number;
    irsz: number;
    telepules: string;
    cim: string;
}

export interface SzerzodesDTO {
    id: number;
    kezdido: Date;
    vegido: Date;
    aktiv: boolean;
    lezarasDatum: string;
    kaucio: number;
    gazOraGyariszam: number;
    villanyOraGyariszam: number;
    vizOraGyariszam: number;
    gazOraKezdoAllas: number;
    villanyOraKezdoAllas: number;
    vizOraKezdoAllas: number;
    gazOraVegAllas: number;
    villanyOraVegAllas: number;
    vizOraVegAllas: number;
    tulajdonos: FoberloDTO;
    berlo: BerloDTO;
    lakas: HazDTO;
}

export interface SzerzodesZarasDTO {
    szerzodesId: number;
    gazOraZaroAllas: number;
    villanyOraZaroAllas: number;
    vizOraZaroAllas: number;
}

export interface OsszegekDTO {
    szid: number;
    tetel: string;
    ertek: number;
}

export interface EsemenyDTO {
    id: number;
    datum: string;
    tipus: string;
    rendhasz: boolean;
    koltseg: number;
    koltsegviselo: "Tulaj" | "Bérlő";
    allapot: string;
    megjegyzes: string;
    zarasDatum: string;
    dokumentum: SzerzodesDTO;
}

export interface BerendezesJegyDTO {
    id: number;
    nev: string;
    allapot: string;
    megjegyzes: string;
    szid: number;
}

export interface JelentkezesDTO {
    id: number,
    berlo: BerloDTO;
    haz: HazDTO;
}

export interface HaviosszesitoDTO {
    id: number;
    datum: Date;
    ev: number;
    honap: number; 
    fizetve: boolean;
    tetelek: OsszesitoTetelDTO[]; 
    szamla: SzamlaDTO;
    szerzodes: SzerzodesDTO;
}

export interface OsszesitoLehetosegDTO {
    ev: number;
    honap: number;
}

export interface OsszesitoTetelDTO {
    id: number;
    megnevezes: string;
    mennyiseg: number;
    egyseg: string;
    osszeg: number;
}

export interface SzamlazzHuIntegracioDTO {
    id: number;
    apiKulcs: string;
    tulajdonos: FoberloDTO;
}

export interface SzamlaDTO {
    id: number;
    szamlaId: string;
    bruttoOsszeg: number;
    pdf: string;
}

export interface LogikaiDTO {
    result: boolean;
}
