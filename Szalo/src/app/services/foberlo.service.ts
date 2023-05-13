import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoberloDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class FoberloService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<FoberloDTO[]>('/api/products');
  }
}
