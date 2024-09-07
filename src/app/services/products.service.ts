import { environment } from './../../environments/environment';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayloadProduct } from '../models/Payload-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getId(id: string) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  save(product: PayloadProduct) {
    return this.http.post<PayloadProduct>(`${environment.apiUrl}/products`, product);
  }

  edit(id: string, product: PayloadProduct) {
    return this.http.put<PayloadProduct>(`${environment.apiUrl}/products/${id}`, product);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
}
