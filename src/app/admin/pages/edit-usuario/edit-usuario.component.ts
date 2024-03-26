import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users.service';
import { MatSelectModule } from '@angular/material/select';
import { RolesService } from '../../../services/roles.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Buffer } from 'buffer';
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from 'sweetalert2';
import { NotificationService } from '../../../services/notification.service';
import { TokenDataService } from '../../../services/token-data.service';

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
    ReactiveFormsModule,
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
            @if (userForm.get('avatar')!.value) {
              <img (click)="compressFile()" [src]="userForm.get('avatar')!.value" alt="avatar">
            } @else {
              <mat-icon (click)="compressFile()">account_circle</mat-icon>
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
                    <input matInput type="password" formControlName="password">
                    <button mat-icon-button matSuffix (click)="changePassword = !changePassword">
                      <mat-icon>close</mat-icon>
                    </button>
                  </mat-form-field>
                }
  
              </div>
              
              @if (this.user().user_id !== userDatos().user_id) {
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
            <button color="primary" mat-raised-button (click)="sendData()" [disabled]="userForm.pristine">GUARDAR</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </form>

  }

  `,
  styleUrl: './edit-usuario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditUsuarioComponent implements OnInit {
  cargandoData: boolean = true;
  changePassword: boolean = false;
  user: any = signal(null);
  roles: any = signal(null);
  imgResultBeforeCompression: any = signal(null);
  imgResultAfterCompression: any = signal(null);
  fb = inject(FormBuilder);
  private tknStr = 'tkn_' + environment.app
  _cookieService = inject(CookieService)
  route = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);
  rolesService = inject(RolesService);
  notificationService = inject(NotificationService);
  imageCompressService = inject(NgxImageCompressService);
  tokenData = inject(TokenDataService);
  cdr = inject(ChangeDetectorRef)
  editPassword: boolean = false;
  userDatos: any = signal(null)
  userForm: FormGroup = this.fb.group({
    password: [null],
    avatar: [null],
    rol: ['']
  })

  ngOnInit(): void {
    this.userDatos.set(this.tokenData.getTokenJson());
    this.loadPage();
  }

  loadPage() {
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
          rol: user.role_id,
          avatar: user.avatar
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
      }, (error) => {
        console.log('Error al traer Roles', error)
      })
  }

  compressFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompression.set(image)
      // console.log('Size in bytes of the uploaded image was:', this.imageCompressService.byteCount(image));
      this.imageCompressService
        .compressFile(image, orientation, 50, 80) // 50% ratio, 80% quality
        .then(compressedImage => {
          this.imgResultAfterCompression.set(compressedImage)
          // console.log('Size in bytes after compression is now:', this.imageCompressService.byteCount(compressedImage));
          this.userForm.patchValue({
            avatar: compressedImage
          })
          this.userForm.markAsDirty();
          this.cdr.detectChanges();
        });
    });
  }

  sendData() {
    if (!this.changePassword) {
      this.userForm.patchValue({
        password: null
      })
    }
    this.usersService.editUser(this.user().user_id, this.userForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Usuario modificado con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.userForm.reset();
        this.changePassword = false;
        this.loadPage();
        this.notificationService.notifyParent();
      }, (error) => {
        Swal.fire({
          text: 'Error al modificar usuario',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        console.log(error);
        this.userForm.reset();
        this.changePassword = false;
        this.loadPage()
      })
      this.cdr.detectChanges()
  }
}
