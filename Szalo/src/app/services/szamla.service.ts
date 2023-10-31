import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzamlaDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class SzamlaService {

  constructor(private http: HttpClient) { }

  getOne(id: number) {
    return this.http.get<SzamlaDTO>(`/api/szamla/${id}`);
  }
}
