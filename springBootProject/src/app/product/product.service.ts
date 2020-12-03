import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
providedIn: 'root',
})
export class ProductService {

    username = '';
    password = '';

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<any> {
    console.log('getProducts method started.');
    // backend have a basic authentication, so i create header object.
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // tslint:disable-next-line:object-literal-key-quotes
          'Authorization': 'Basic ' + btoa('znrktkc' + ':' + 'start')
        })
    };
    console.log('getProducts method finished..');
    return this.http
      .get<any>('http://localhost:8082/api/product/getProducts', httpOptions)
      .pipe(
        map((res) => res),
      );
  }
  getProductsWithFilter( name: string, description: string, detailDescription: string, page: any,
    // tslint:disable-next-line:align
    sortType: string, sortField: string): Observable<any> {
  // if fields are undefined this lines set it for default values.
  name = name ? name : '';
  description = description ? description : '';
  detailDescription = detailDescription ? detailDescription : '';
  sortField = sortField ? sortField : '';
  sortType = sortType ? sortType : 'asc';
  page = page ? page : 0;

  console.log('getProductsWithFilter method calld with name: ' + name + ' description: ' + description +
  ' detailDescription: ' + detailDescription + ' page: ' + page
  + ' sortField: ' + sortField + ' sortType: ' + sortType);

  const httpOptions = {
    // backend have a basic authentication, so i create header object.
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Basic ' + btoa('znrktkc' + ':' + 'start')
      })
    };
   // for productList i create a GET request in backend, so i sent to parameters with this way.
  return this.http
    .get<any>('http://localhost:8082/api/product/getProductsWithFilters?name=' + name + '&description=' + description
    + '&detailDescription=' + detailDescription + '&page=' + page + '&sortField=' + sortField + '&sortType=' + sortType, httpOptions)
    .pipe(
      map((res) => res),
    );
  }
}
