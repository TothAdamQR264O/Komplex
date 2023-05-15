import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<ProductDTO[]>('/api/products');
  }

  getOne(id: number){
    return this.http.get<ProductDTO>('/api/products/' + id);
  }

  create(product: ProductDTO){
    return this.http.post<ProductDTO>('/api/products', product);
  }

  update(product: ProductDTO){
    return this.http.put<ProductDTO>('/api/products', product);
  }

  delete(id: number){
    return this.http.delete('/api/products/' + id);
  }
}
