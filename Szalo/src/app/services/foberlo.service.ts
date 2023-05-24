import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessTokenDTO, FoberloDTO, LoginDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class FoberloService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<FoberloDTO[]>('/api/foberlo');
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/foberlo/login', data);
  }

  getOne(szemszamfb: string){
    return this.http.get<FoberloDTO>('/api/foberlo' + szemszamfb);
  }

  create(foberlo: FoberloDTO){
    return this.http.post<FoberloDTO>('/api/foberlo', foberlo);
  }

  update(foberlo: FoberloDTO){
    return this.http.put<FoberloDTO>('/api/foberlo', foberlo);
  }

  delete(szemszamfb: string){
    return this.http.delete<FoberloDTO>('/api/foberlo' + szemszamfb);
  }
}
