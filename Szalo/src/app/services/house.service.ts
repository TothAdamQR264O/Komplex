import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HazDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<HazDTO[]>('/api/home');
  }

  getOne(hrsz: number){
    return this.http.get<HazDTO>('/api/home/' + hrsz);
  }

  create(haz: HazDTO){
    return this.http.post<HazDTO>('/api/home', haz);
  }

  update(haz: HazDTO){
    return this.http.put<HazDTO>('/api/home', haz);
  }

  delete(hrsz: number){
    return this.http.delete('/api/home/' + hrsz);
  }
}
