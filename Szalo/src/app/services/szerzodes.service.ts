import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzerzodesDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class SzerzodesService {

  constructor(private http: HttpClient) { }


  create(applyId: number){
    return this.http.post<SzerzodesDTO>(`/api/szerzodes/${applyId}`, null);
  }

  getBerlo(){
    return this.http.get<SzerzodesDTO[]>('/api/lak');
  }

  getTulaj(hazId: number){
    return this.http.get<SzerzodesDTO[]>(`/api/home/${hazId}`);
  }

  /*

  create(hazId: number, applyId: number){
    return this.http.post<SzerzodesDTO>(`/api/jelentkez/${hazId}/${applyId}`, null);
  }*/
}
