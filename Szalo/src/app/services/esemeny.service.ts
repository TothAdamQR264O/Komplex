import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EsemenyDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class EsemenyService {

  constructor(private http: HttpClient) { }


  getAll(){
    return this.http.get<EsemenyDTO[]>('/api/event');
  }

  create(event: EsemenyDTO){
    return this.http.post<EsemenyDTO>('/api/event', event);
  }

  getOne(id: number){
    return this.http.get<EsemenyDTO>('/api/event/' + id);
  }

  update(event: EsemenyDTO){
    return this.http.put<EsemenyDTO>('/api/event', event);
  }
}
