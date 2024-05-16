import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService  {
  private loader = new Subject<boolean>();

  loader$ = this.loader.asObservable();

  constructor() { }

  setLoader(value: boolean) {
    this.loader.next(value);
  }

}
