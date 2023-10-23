import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzerzodesDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class SzerzodesService {

  constructor(private http: HttpClient) { }


  create(szerzodes: SzerzodesDTO){
    return this.http.post<SzerzodesDTO>(`/api/szerzodes`, szerzodes);
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

  /*

  create(hazId: number, applyId: number){
    return this.http.post<SzerzodesDTO>(`/api/jelentkez/${hazId}/${applyId}`, null);
  }*/
}
