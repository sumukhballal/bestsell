import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { Paging } from 'src/app/models/paging';
import { ProductPaginData } from 'src/app/models/product-pagin-data';
import { ProductDetails } from 'src/app/models/product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getProductByDepartmentId(paging: Paging): Observable<Product[]>{
    return this.http.post<Product[]>(`${this.url}department/getDepartments`, paging);
  }

  getProductList(paging: Paging): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.url}product/getFilteredProducts`, { paging: paging });
  }

  getAllProductList():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}product/getProducts`);
  }

  getProductDetailsById(productId: number):Observable<Product> {
    return this.http.get<Product>(`${this.url}product/getProductDetails?productId=${productId}`);
  }

  getProductDetailsByOrderId(customerID: number, orderId: number) : Observable<ProductDetails[]>
  {
    return this.http.get<ProductDetails[]>(`${this.url}product/getProductDetailsForOrder?customerID=${customerID}&orderID=${orderId}`)
  }

}
