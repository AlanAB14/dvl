import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UsersService } from '../../../services/users.service';
import {MatSelectModule} from '@angular/material/select';
import { RolesService } from '../../../services/roles.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
  @if (cargandoData && !this.user()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (this.user() && this.roles()) {
    <form [formGroup]="userForm">
      <div class="data">
        <mat-card class="example-card">
          <mat-card-header>
            @if (user.avatar) {
              <img [src]="'data:image/png;base64,' + user.avatar" alt="avatar">
            } @else {
              <mat-icon>account_circle</mat-icon>
            }
          </mat-card-header>
          <mat-card-content>
            <div class="data-formulario">
              <mat-form-field class="example-full-width-user">
                <mat-label>Usuario</mat-label>
                  <input matInput placeholder="Username" [value]="user().username" disabled="true">
              </mat-form-field>
    
              <div class="campo-editable">
                @if (!changePassword) {
                  <button class="btn-contrasenia" mat-raised-button (click)="changePassword = !changePassword">Cambiar Contaseña</button>
                } @else if (changePassword) {
                  <mat-form-field class="example-full-width">
                    <mat-label>Nueva contraseña</mat-label>
                    <input matInput type="password">
                    <button mat-icon-button matSuffix (click)="changePassword = !changePassword">
                      <mat-icon>close</mat-icon>
                    </button>
                  </mat-form-field>
                }
  
              </div>
              
              @if (this.user().user_id !== getTokenJson().user_id) {
                <mat-form-field class="example-full-width-user">
                  <mat-label>Rol</mat-label>
                  <mat-select formControlName="rol">
                    @for (rol of this.roles(); track rol) {
                      <mat-option [value]="rol.role_id">{{ rol.role }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }
              
            </div>
          </mat-card-content>
          <mat-card-actions align="end">
            <button color="primary" mat-raised-button>GUARDAR</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </form>
  }

  `,
  styleUrl: './edit-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditUsuarioComponent implements OnInit{
  cargandoData: boolean = true;
  changePassword: boolean = false;
  user: any = signal(null);
  roles: any = signal(null);
  fb = inject(FormBuilder);
  private tknStr = 'tkn_' + environment.app
  _cookieService = inject(CookieService)
  route = inject(ActivatedRoute);
  usersService = inject(UsersService);
  rolesService = inject(RolesService);
  editPassword: boolean = false;

  userForm: FormGroup = this.fb.group({
    password: [''],
    avatar: [''],
    rol: ['']
  })

  ngOnInit(): void {
    this.getTipoRoles();
    this.route.params.subscribe(params => {
      this.getUser(params['id']);
    });
  }

  getUser(id: number) {
    this.usersService.getUser(id)
      .subscribe((user: any) => {
        this.user.set(user)
        this.userForm.patchValue({
          rol: user.role_id
        })
        this.cargandoData = false;
      }, (error) => {
        console.log('Error en traer usuario', error);
        this.cargandoData = false;
      })
  }

  getTipoRoles() {
    this.rolesService.getRoles()
      .subscribe(roles => {
        this.roles.set(roles)
        console.log(roles)
      }, (error) => {
        console.log('Error al traer Roles', error)
      })
  }

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
