import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzerzodesDTO, SzerzodesZarasDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class SzerzodesService {

  constructor(private http: HttpClient) { }


  create(jelentkezesId:number, szerzodes: SzerzodesDTO){
    return this.http.post<SzerzodesDTO>(`/api/szerzodes/jelentkezes/${jelentkezesId}`, szerzodes);
  }

  getAll(){
    return this.http.get<SzerzodesDTO[]>('/api/szerzodes');
  }

  getOne(id: number){
    return this.http.get<SzerzodesDTO>(`/api/szerzodes/${id}`);
  }

  getSzerzodes(id: number) {
    return this.http.get<SzerzodesDTO>(`/api/szerzodes/${id}`);
  }

  getBerlo(){
    return this.http.get<SzerzodesDTO[]>('/api/lak');
  }

  getTulaj(){
    return this.http.get<SzerzodesDTO[]>(`/api/szerzodes/sajat`);
  }

  zaras(beallitasok: SzerzodesZarasDTO) {
    return this.http.put<SzerzodesDTO>(`/api/szerzodes/${beallitasok.szerzodesId}/zaras`, beallitasok);
  }
}
