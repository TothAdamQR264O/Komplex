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

  getAll(){
    return this.http.get<HaviosszesitoDTO[]>('/api/monsummary');
  }

  getLehetosegek(szerzodesId: number) {
    return this.http.get<OsszesitoLehetosegDTO[]>(`/api/osszesito/${szerzodesId}/lehetosegek`);
  }
}
