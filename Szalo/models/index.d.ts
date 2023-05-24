export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}

export interface FoberloDTO {
    szemszamfb: string;
    namefb: string;
    email: string;
    szamlaszamfb: string;
    password: string;
    telfb: number;
}

export interface HazDTO {
    hrsz: string;
    cim: string;
    reszi: number;
    furdo: number;
    wc: number;
    viz: string;
    melegviz: string;
    internet: string;
    tv: string;
    tuzhely: string;
    mosogep: string;
    meret: number;
    tulaj: FoberloDTO;
}

export interface SzobaDTO {
    szid: number;
    ar: number;
    meret: number;
    ferohely: number;
    hrsz: HazDTO;
}

export interface BerloDTO {
    szemszamb: string;
    nameb: string;
    email: string;
    szamlaszamb: string;
    password: string;
    telb: number;
    szid: SzobaDTO;
}