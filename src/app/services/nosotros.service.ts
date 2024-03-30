import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NosotrosService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getInfoUs() {
    return this.http.get(`${ this._url }/infoUs`)
  }

  editInfoUs(id:number, data: any) {
    return this.http.patch(`${ this._url }/infoUs/${id}`, data)
  }
}
