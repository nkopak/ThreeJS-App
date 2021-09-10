import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private api: ApiService) { }

  public getState(id: string): Observable<any> {
    return this.api.get(`state/${id}`);
  }

  public saveState(state: any): Observable<any> {
    return this.api.post(`state`, state);
  }
}
