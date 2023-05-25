import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SzobaDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<SzobaDTO[]>('/api/room');
  }

  getOne(id: number){
    return this.http.get<SzobaDTO>('/api/room/' + id);
  }

  create(szoba: SzobaDTO){
    return this.http.post<SzobaDTO>('/api/room', szoba);
  }

  update(szoba: SzobaDTO){
    return this.http.put<SzobaDTO>('/api/room', szoba);
  }

  delete(id: number){
    return this.http.delete('/api/room/' + id);
  }
}
