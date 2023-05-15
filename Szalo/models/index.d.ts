export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
}

export interface ProductDTO {
    id: number;
    title: string;
    description: string;
    price: number;
    imgUrl: string;
    brand: string;
    uploader: null | UserDTO;
}

export interface HazDTO {
    hrsz: string;
    cim: string;
    tulaj: string;
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
}

export interface FoberloDTO {
    szemszamfb: string;
    namefb: string;
    emailfb: string;
    szamlaszamfb: string;
    jelszofb: string;
    telfb: number;
}