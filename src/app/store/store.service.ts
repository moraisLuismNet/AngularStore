import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthGuard } from '../guards/auth-guard.service';
import { ICategory, IProduct } from './store.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  urlAPI = environment.urlAPI;
  constructor(private http: HttpClient, private authGuard: AuthGuard) {}

  getCategories(): Observable<ICategory[]> {
    const headers = this.getHeaders();
    return this.http.get<ICategory[]>(`${this.urlAPI}categories`, { headers });
  }

  addCategory(category: ICategory): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.post<ICategory>(`${this.urlAPI}categories`, category, { headers });
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.put<ICategory>(`${this.urlAPI}categories/${category.idCategory}`, category, {
      headers
    });
  }

  deleteCategory(id: number): Observable<ICategory> {
    const headers = this.getHeaders();
    return this.http.delete<ICategory>(`${this.urlAPI}categories/${id}`, {
      headers
    });
  }

  getHeaders(): HttpHeaders {
    const token = this.authGuard.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  getProducts(): Observable<IProduct[]> {
    const headers = this.getHeaders();
    return this.http.get<IProduct[]>(`${this.urlAPI}Products`, { headers });
  }

  addProduct(product: IProduct): Observable<IProduct> {
    const headers = this.getHeaders();
    const formData = new FormData();
    formData.append('productName', product.productName);
    formData.append('price', product.price.toString());
    formData.append('categoryId', product.categoryId?.toString() || '');
    formData.append('discontinued', product.discontinued ? 'true' : 'false');
    if (product.photo) {
      formData.append('photo', product.photo);
    }
    return this.http.post<IProduct>(`${this.urlAPI}Products`, formData, { headers });
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    console.log("Sending PUT request for product ID:", product.idProduct); 
    const formData = new FormData();
    formData.append('idProduct', product.idProduct.toString());
    formData.append('productName', product.productName);
    formData.append('price', product.price.toString());
    formData.append('categoryId', product.categoryId?.toString() || '');
    formData.append('discontinued', product.discontinued ? 'true' : 'false');
    if (product.photo) {
      formData.append('photo', product.photo);
    }

    return this.http.put<IProduct>(`${this.urlAPI}products/${product.idProduct}`, formData, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<IProduct> {
    const headers = this.getHeaders();
    return this.http.delete<IProduct>(`${this.urlAPI}Products/${id}`, {
      headers
    });
  }
}
