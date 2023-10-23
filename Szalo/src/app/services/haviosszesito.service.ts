import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HaviosszesitoDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class HaviosszesitoService {

  constructor(private http: HttpClient) { }

  create(haviossz: HaviosszesitoDTO){
    return this.http.post<HaviosszesitoDTO>('/api/monsummary', haviossz);
  }

  getAll(){
    return this.http.get<HaviosszesitoDTO[]>('/api/monsummary');
  }
}
