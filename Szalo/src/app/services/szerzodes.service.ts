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

  getAll(){
    return this.http.get<SzerzodesDTO[]>('/api/lak');
  }
  /*

  create(hazId: number, applyId: number){
    return this.http.post<SzerzodesDTO>(`/api/jelentkez/${hazId}/${applyId}`, null);
  }*/
}
