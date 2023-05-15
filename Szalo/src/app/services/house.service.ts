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
}
