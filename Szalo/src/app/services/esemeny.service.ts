import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EsemenyDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  constructor(private http: HttpClient) { }


  getAll(szerzodesId: number){
    return this.http.get<EsemenyDTO[]>(`/api/esemeny/osszes/${szerzodesId}`);
  }

  create(event: EsemenyDTO){
    return this.http.post<EsemenyDTO>('/api/esemeny', event);
  }

  getOne(id: number){
    return this.http.get<EsemenyDTO>('/api/esemeny/' + id);
  }

  getBerlo(){
    return this.http.get<EsemenyDTO[]>('/api/lak');
  }

  update(event: EsemenyDTO){
    return this.http.put<EsemenyDTO>('/api/esemeny', event);
  }
}
