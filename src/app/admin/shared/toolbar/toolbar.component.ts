import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Buffer } from 'buffer';
import { UsersService } from '../../../services/users.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
      <mat-toolbar color="primary" class="example-toolbar">
        <button mat-icon-button (click)="emitEvent()"><mat-icon>menu</mat-icon></button>
        <a routerLink="/admin">
          <h1 class="example-app-name" style="margin-left: 1.5rem;">DVL Admin</h1>
        </a>
        <div class="user" [matMenuTriggerFor]="menu">
          @if (loading) {
            <mat-spinner></mat-spinner>
          }@else if (!loading && user() && user().avatar) {
            <img [src]="user().avatar" alt="avatar">
          }@else if (!loading && user() && !user().avatar) {
            <mat-icon>account_circle</mat-icon>
          }       
        </div>
          @if (!loading && user()) {
            <p [matMenuTriggerFor]="menu" class="name-user">{{ user().username }}</p>
          }
          <mat-menu #menu="matMenu">
            @if (!loading && user()) {
              <a [routerLink]="['edit-usuario', user().user_id]"
              routerLinkActive="router-link-active">
                <button mat-menu-item>
                  Editar
                </button>
              </a>
              <button mat-menu-item (click)="logOut()">Salir</button>
            }
          </mat-menu>
    </mat-toolbar>
  `,
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Output() toggle = new EventEmitter<any>();
  user: any = signal(null);
  loading: boolean = true;
  private tknStr = 'tkn_' + environment.app
  _cookieService = inject(CookieService)
  usersService = inject(UsersService)
  authService = inject(AuthService)
  notificationService = inject(NotificationService)
  cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.loadData()

    this.notificationService.notifyParent$.subscribe(() => {
      this.loadData();
      console.log(this.user())
    });
  }

  loadData() {
    const userToken = this.getTokenJson()
    this.getUser(userToken.user_id)
  }

  emitEvent() {
    this.toggle.emit();
  }

  getToken() {
    return this._cookieService.get(this.tknStr);
  }

  getUser(id: number) {
    this.loading = true;
    this.usersService.getUser(id)
      .subscribe((user: any) => {
        this.loading = false;
        this.user.set(user)
        this.cdr.detectChanges()
      }, (error) => {
        this.loading = false;
        this.cdr.detectChanges()
        console.log('Error al traer usuario', error)
      })
  }

  logOut() {
    this.authService.logout()
  }

  private getTokenJson(): any {
    let token = this.getToken();
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    const tokenObject = JSON.parse(jsonPayload);
    return tokenObject;
  }
}
