import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifyParentSource = new Subject<void>();

  notifyParent$ = this.notifyParentSource.asObservable();

  notifyParent() {
    this.notifyParentSource.next();
  }
}