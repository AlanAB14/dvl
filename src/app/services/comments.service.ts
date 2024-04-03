import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private _url = environment.apiBase

  constructor( private http: HttpClient ) { }

  getComments() {
    return this.http.get(`${ this._url }/comments`)
  }

  editComments(id: number, comment: any) {
    return this.http.patch(`${ this._url }/comments/${ id }`, comment)
  }

}
