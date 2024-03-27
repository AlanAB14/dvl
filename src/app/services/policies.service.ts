import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  getPolicies() {
    return this.http.get(`${ this._url }/policies`)
  }

  addPolicy(data: any) {
    return this.http.post(`${ this._url }/policies`, data)
  }

  editPolicy(id: number, data: any) {
    return this.http.patch(`${ this._url }/policies/${ id }`, data)
  }

  deletePolicy(id: number) {
    return this.http.delete(`${ this._url }/policies/${ id }`)
  }

}
