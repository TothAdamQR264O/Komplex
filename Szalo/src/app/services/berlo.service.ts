import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenDTO, BerloDTO, LoginDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class BerloService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BerloDTO[]>('/api/berlo');
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/berlo/login', data);
  }

  getOne(id: string) {
    return this.http.get<BerloDTO>('/api/berlo' + id);
  }

  create(berlo: BerloDTO) {
    return this.http.post<BerloDTO>('/api/berlo', berlo);
  }

  update(berlo: BerloDTO) {
    return this.http.put<BerloDTO>('/api/berlo', berlo);
  }

  delete(id: string) {
    return this.http.delete<BerloDTO>('/api/berlo' + id);
  }
}
