import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {

  private _url = environment.apiBase


  constructor( private http: HttpClient ) { }

  getCertifications() {
    return this.http.get(`${ this._url }/certifications`)
  }

  addCertification(certification: any) {
    return this.http.post(`${ this._url }/certifications/`, certification)
  }

  editCertifications(id: number, certification: any) {
    return this.http.patch(`${ this._url }/certifications/${ id }`, certification)
  }
  
  deleteCertifications(id: number) {
    return this.http.delete(`${ this._url }/certifications/${ id }`)
  }

}
