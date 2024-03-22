import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getUser(id: number) {
    return this.http.get(`${ this._url }/usuarios/${ id }`)
  }

}
