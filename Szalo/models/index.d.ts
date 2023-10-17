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
    namefb: string;
    email: string;
    password: string;
    szamlaszamfb: string;
    telfb: number;
}

export interface HazDTO {
    id: number;
    hrsz: string;
    irsz: number;
    telepules: string;
    cim: string;
    reszi: number;
    ar: number;
    szobakszama: number;
    meret: number;
    tulaj: FoberloDTO;
    alapot: string;
    konfort: string;
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
    gepesitet: string;
    hirdet: string;
}


export interface BerloDTO {
    id: number;
    nameb: string;
    email: string;
    password: string;
    szamlaszamb: string;
    telb: number;
}

export interface SzerzodesDTO {
    id: number;
    kezdido: Date;
    vegido: Date;
    kaukcio: number;
    ggyszam: number;
    agyszam: number;
    vgyszam: number;
    gora: number;
    aora: number;
    vora: number;
    tid: FoberloDTO;
    bid: BerloDTO;
    hid: HazDTO;
}

export interface SzamlaDTO {
    id: number;
    idopotn: Date;
    osszeg: number;
    szid: SzerzodesDTO;
}

export interface OsszegekDTO {
    szid: number;
    tetel: string;
    ertek: number;
}

export interface EsemenyDTO {
    id: number;
    datum: Date;
    tipus: string;
    rendhasz: string;
    koltseg: number;
    koltsvis: string;
    alapot: string;
    megjegyzes: string;
    dokumentum: SzerzodesDTO;
}

export interface BerendezesJegyDTO {
    id: number;
    nev: string;
    alapot: string;
    megjegyzes: string;
    szid: number;
}

export interface JelentkezesDTO {
    id: number,
    berlo: BerloDTO;
    haz: HazDTO;
}