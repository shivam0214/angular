import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config/app-config.token';
import { AppConfig } from '../app-config';
import { map } from 'rxjs/operators';
export interface Product {
  _id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
  createdBy: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //constructor(private http: HttpClient,@Inject(APP_CONFIG) private config: AppConfig) {}

  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.apiUrl = this.config.apiEndpoint;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl, { params: { _sort: 'id', _order: 'asc' } })
      .pipe(
        map(response => response.products) // Extract the 'products' array from the response
      );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: any, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductByid(id: string): Observable<Product> {
    return this.http.get<{ product: Product }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.product) // Extract the 'product' property from the response
    );
  }
}
