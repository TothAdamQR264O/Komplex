import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JelentkezesDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class JelentkezService {

  constructor(private http: HttpClient) { }

  getAll(hazId: number){
    return this.http.get<JelentkezesDTO[]>(`/api/jelentkez/${hazId}`);
  }

  create(hazId: number){
    return this.http.post<JelentkezesDTO>(`/api/jelentkez/${hazId}`, null);
  }

  getOne(id: number){
    return this.http.get<JelentkezesDTO>(`/api/jelentkez/` + id);
  }
}
