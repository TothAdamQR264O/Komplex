import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<UserDTO[]>('/api/users');
  }

  getOne(id: number){
    return this.http.get<UserDTO>('/api/users' + id);
  }

  create(product: UserDTO){
    return this.http.post<UserDTO>('/api/users', product);
  }

  update(product: UserDTO){
    return this.http.put<UserDTO>('/api/users', product);
  }

  delete(id: number){
    return this.http.delete<UserDTO>('/api/users' + id);
  }
}
