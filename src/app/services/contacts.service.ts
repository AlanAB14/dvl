import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  createContact(contact: any) {
    return this.http.post(`${ this._url }/contacts`, contact)
  }

  getContacts() {
    return this.http.get(`${ this._url }/contacts`)
  }

  deleteContact(id: number) {
    return this.http.delete(`${ this._url }/contacts/${ id }`)
  }

}
