import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JelentkezesDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class JelentkezService {

  constructor(private http: HttpClient) { }


  create(jelentkez: JelentkezesDTO){
    return this.http.post<JelentkezesDTO>('/api/jelentkez', jelentkez);
  }
}
