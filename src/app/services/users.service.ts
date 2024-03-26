import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  addUser(datos: any) {
    return this.http.post(`${ this._url }/usuarios/register`, datos)
  }

  getUser(id: number) {
    return this.http.get(`${ this._url }/usuarios/${ id }`)
  }

  getUsers() {
    return this.http.get(`${ this._url }/usuarios`)
  }

  editUser(id: number, datos: any) {
    return this.http.patch(`${ this._url }/usuarios/${ id }`, datos)
  }

  deleteUser(id: number) {
    return this.http.delete(`${ this._url }/usuarios/${ id }`)
  }

}
