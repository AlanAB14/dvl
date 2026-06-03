import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../core/interfaces/Contact';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _url = environment.apiBase

  constructor(private http: HttpClient) { }

  createContact(contact: any) {
    const external$ = this.http.post(`https://webservice.tcsa.com.ar/API/ContactoDVL`, this.transformContactBody(contact)).pipe(catchError(() => of(null)));
    const internal$ = this.http.post(`${this._url}/contacts`, {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      origin: contact.origin,
      dni: contact.dni,
      telephone: contact.telephone,
      message: contact.message
    });
    return forkJoin([external$, internal$]);
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
      "utm_campaign": "SITIO_WEB"
    }
  }

}
