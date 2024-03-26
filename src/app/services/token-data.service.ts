import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class TokenDataService {
  private tknStr = 'tkn_' + environment.app;
  _cookieService = inject(CookieService)

  constructor() { }
  
  getToken() {
    return this._cookieService.get(this.tknStr);
  }

  getTokenJson(): any {
    let token = this.getToken();
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    const tokenObject = JSON.parse(jsonPayload);
    return tokenObject;
  }

}
