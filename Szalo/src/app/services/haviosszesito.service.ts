import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HaviosszesitoDTO, OsszesitoLehetosegDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class HaviosszesitoService {

  constructor(private http: HttpClient) { }

  create(szerzodesId: number, lehetoseg: OsszesitoLehetosegDTO){
    return this.http.post<HaviosszesitoDTO>(`/api/osszesito/${szerzodesId}/${lehetoseg.ev}/${lehetoseg.honap}`, null);
  }

  getAll(szerzodesId: number){
    return this.http.get<HaviosszesitoDTO[]>(`/api/osszesito/szerzodes/${szerzodesId}`);
  }

  get(id: number){
    return this.http.get<HaviosszesitoDTO>(`/api/osszesito/${id}`);
  }

  getLehetosegek(szerzodesId: number) {
    return this.http.get<OsszesitoLehetosegDTO[]>(`/api/osszesito/szerzodes/${szerzodesId}/lehetosegek`);
  }

  fizetve(id: number) {
    return this.http.put(`/api/osszesito/${id}/fizetve`, null);
  }
}
