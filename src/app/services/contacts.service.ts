import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../core/interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  createContact(contact: any) {
    const body = this.transformContactBody(contact);
    return this.http.post(`https://webservice.tcsa.com.ar/API/ContactoDVL`, body)
  }

  getContacts() {
    return this.http.get(`${ this._url }/contacts`)
  }

  deleteContact(id: number) {
    return this.http.delete(`${ this._url }/contacts/${ id }`)
  }

  private transformContactBody(contact: Contact) {
    return {
      "Submission Date": new Date().toISOString(),
      "Form Title": "Contactanos",
      "Nombre completo:": contact.name,
      "DNI o CUIT:": contact.dni,
      "Empresa:": contact.company,
      "E-mail:": contact.email,
      "Teléfono:": contact.telephone,
      "Localidad:": "Venado Tuerto",
      "¿Dónde nos conociste?": contact.origin,
      "Consulta por:": contact.message,
      "Comentarios:": "Contacto desde el sitio web",
      "utm_campaign": "POSTMAN"
    }
  }

}
