import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get(`${ this._url }/roles`)
  }

}
