export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
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
    cim: string;
    reszi: number;
    furdo: number;
    wc: number;
    viz: string;
    melegviz: string;
    internet: string;
    tv: string;
    mosogep: string;
    meret: number;
    tulaj: FoberloDTO;
}

export interface SzobaDTO {
    id: number;
    ar: number;
    meret: number;
    ferohely: number;
    hid: HazDTO;
}

export interface BerloDTO {
    id: number;
    nameb: string;
    email: string;
    password: string;
    szamlaszamb: string;
    telb: number;
    szid: SzobaDTO;
}