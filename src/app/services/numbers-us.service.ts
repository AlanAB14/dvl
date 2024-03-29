import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NumbersUsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getNumbers() {
    return this.http.get(`${ this._url }/numbersUs`)
  }

  editNumbers(data: any) {
    return this.http.patch(`${ this._url }/numbersUs`, data)
  }

}
