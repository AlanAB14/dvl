import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  private _loadData = new BehaviorSubject<any>(null);
  variableGlobal$ = this._loadData.asObservable();

  constructor() { }

  setVariableGlobal(value: boolean) {
    this._loadData.next(value);
  }

}
