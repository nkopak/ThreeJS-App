import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = environment.api;

  constructor(private httpClient: HttpClient) { }

  public get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(`${this.api}/${url}`, {params});
  }

  public post(url: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.api}/${url}`, data);
  }

  public put(url: string, data: any): Observable<any> {
    return this.httpClient.put(`${this.api}/${url}`, data);
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(`${this.api}/${url}`);
  }
}
