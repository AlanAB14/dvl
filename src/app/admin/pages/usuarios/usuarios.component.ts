import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getSpainPaginatorIntl } from '../../../utils/translate-paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import  {MatTableDataSource, MatTableModule } from '@angular/material/table';

import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RolesService } from '../../../services/roles.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatPaginator,
    MatPaginatorModule,
    MatProgressSpinner,
    MatSortModule,
    MatTableModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],
  template: `
  @if (cargandoData && !this.users()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.users()) {
    
    <div class="users">
      <div class="box-agregar-usuario">
        <button mat-raised-button color="primary" (click)="agregarUsuario()">Agregar Usuario</button>
      </div>
      <mat-form-field>
        <mat-label>Buscar</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Usuario" #input>
      </mat-form-field>
      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="user_id">
              <th mat-header-cell *matHeaderCellDef> Id </th>
              <td mat-cell *matCellDef="let element"> {{element.user_id}} </td>
            </ng-container>
          
            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef> Username </th>
              <td mat-cell *matCellDef="let element"> {{element.username}} </td>
            </ng-container>
          
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef> Email </th>
              <td mat-cell *matCellDef="let element"> {{element.email}} </td>
            </ng-container>
          
            <ng-container matColumnDef="avatar">
              <th mat-header-cell *matHeaderCellDef>  </th>
              <td mat-cell *matCellDef="let element"> 
                @if (element.avatar) {
                  <img class="img-avatar" [src]="element.avatar" alt="user-image">
                }@else {
                  <mat-icon class="img-icon">account_circle</mat-icon>
                }
              </td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>  </th>
              <td mat-cell *matCellDef="let element"> 
                <button (click)="editUser(element.user_id)" class="button-table-icon" mat-mini-fab color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button (click)="deleteUser(element.user_id)" mat-mini-fab class="button-table-icon icon-delete-user">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="4" style="padding: 1rem;">No se encontro el usuario "{{input.value}}"</td>
            </tr>
          </table>
        </div>
        <mat-paginator #paginator [length]="this.users().length"
              [pageSize]="5"
              [pageSizeOptions]="[5, 10, 50]"
              aria-label="Select page">
        </mat-paginator>
      </div>

      </div>
  }
  
  `,
  styleUrl: './usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosComponent implements OnInit {
  cargandoData: boolean = true;
  users: any = signal(null)
  userService = inject(UsersService);
  router = inject(Router);
  dialog = inject(MatDialog);
  private paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['user_id', 'username', 'email', 'avatar', 'actions'];

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getUsers();
  }
  
  getUsers() {
    this.cargandoData = true
    this.userService.getUsers()
      .subscribe((users: any) => {
        this.users.set(users)
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer usuarios', error);
        this.cargandoData = false;
      })
    
  }

  editUser( id: number ) {
    this.router.navigate(['/admin/edit-usuario', id])
  }

  deleteUser( id: number ) {
    Swal.fire({
      text: '¿Estás seguro de eliminar el usuario?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
      customClass: {
        confirmButton: '',
      }
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          html: `<div style="display:flex; justify-content:center"><img src="assets/imgs/loader.gif" /></div>`,
          showConfirmButton: false
        })
        this.userService.deleteUser(id)
          .subscribe(resp => {
            Swal.fire({
              text: 'Usuario eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getUsers();
          }, (error) => {
            Swal.fire({
              text: 'Error al eliminar usuario',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getUsers();
          })
      }
    });
  }

  agregarUsuario() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h2 mat-dialog-title>Agregar Usuario</h2>
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="userForm">
        <div class="campo-dialog">
          <mat-form-field class="example-full-width">
            <mat-label>Email</mat-label>
            <input  matInput formControlName="email">
          </mat-form-field>
        </div>
        <div class="campo-dialog">
          <mat-form-field class="example-full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>
        </div>
        <div class="campo-dialog">
          <mat-form-field class="example-full-width">
            <mat-label>Contraseña</mat-label>
            <input type="password" formControlName="password" matInput>
          </mat-form-field>
        </div>
        <div class="campo-dialog">
          @if (userForm.get('avatar')!.value) {
            <img (click)="addAvatar()" [src]="userForm.get('avatar')!.value" alt="avatar">
          }@else {
            <button (click)="addAvatar()" mat-raised-button class="avatar-btn">Seleccione un avatar</button>
          }
          <mat-form-field class="example-full-width" style="display: none;">
            <mat-label>Avatar</mat-label>
            <input type="text" formControlName="avatar" matInput hidden>
          </mat-form-field>
        </div>
        <div class="campo-dialog">
          @if (this.roles()) {
            <mat-form-field class="example-full-width">
              <mat-label>Rol</mat-label>
              <mat-select formControlName="role_id">
                @for (rol of this.roles(); track $index) {
                  <mat-option [value]="rol.role_id">{{rol.role}}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          }
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Salir</button>
      <button mat-raised-button cdkFocusInitial color="primary" (click)="agregarUsuario()" [disabled]="!userForm.valid">Agregar</button>
    </mat-dialog-actions>
  
  `,
  standalone: true,
  styles: `
    .avatar-btn {
      margin-bottom: 1.2rem;
      width: 100%
    }

    form {
      min-width: 26rem
    }

    .example-full-width {
      width: 100%
    }

    .campo-dialog {
      display: flex;
      justify-content: center;
    }
    .campo-dialog img {
      width: 8rem;
      margin-bottom: 1.2rem;
      cursor: pointer
    }
  
  `,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
})
export class DialogContentExampleDialog implements OnInit{
  imgResultBeforeCompression: any = signal(null);
  imgResultAfterCompression: any = signal(null);
  fb = inject(FormBuilder);
  rolesService = inject(RolesService);
  usersService = inject(UsersService);
  imageCompressService = inject(NgxImageCompressService);
  dialogRef = inject(MatDialogRef)


  roles: any = signal(null);
  userForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    avatar: [null],
    role_id: ['', Validators.required]
  })
  
  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles()
      .subscribe((roles: any) => {
        this.roles.set(roles)
      }, (error) => {
        console.log('Error al obtener roles', error)
      })
  }

  addAvatar() {
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
          // this.cdr.detectChanges();
        });
    });
  }

  agregarUsuario() {
    if (!this.userForm.valid) {
      return
    }
    this.usersService.addUser(this.userForm.value)
      .subscribe(user => {
        Swal.fire({
          text: 'Usuario creado con éxito',
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: '',
          }
        })
        this.dialogRef.close()
      }, (error) => {
        Swal.fire({
          text: `Error al crear usuario, ${ error.error.message }`,
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: '',
          }
        })
        console.log(error)
      })
  }

}
