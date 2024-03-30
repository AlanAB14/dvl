import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(`${ this._url }/news`)
  }

  addNew(data: any) {
    return this.http.post(`${ this._url }/news`, data)
  }

  editNew(id: number, data: any) {
    return this.http.patch(`${ this._url }/news/${id}`, data)
  }

  deleteNew(id: number) {
    return this.http.delete(`${ this._url }/news/${ id }`)
  }

}
