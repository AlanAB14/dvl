import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { ContactsService } from '../../../services/contacts.service';
import { getSpainPaginatorIntl } from '../../../utils/translate-paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    TruncatePipe,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],
  template: `
  @if (cargandoData && !this.contactos()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.contactos()) {
    
    <div class="users">

      <mat-form-field>
        <mat-label>Buscar</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Texto" #input>
      </mat-form-field>
      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>

            <ng-container matColumnDef="created_at">
              <th mat-header-cell *matHeaderCellDef> Fecha </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.created_at | date:'dd/MM/YYYY'"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Nombre </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.name | appTruncate"></div> 
            </td>
            </ng-container>
            
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef> Email </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.email | appTruncate"></div> 
              </td>
            </ng-container>

            <ng-container matColumnDef="company">
              <th mat-header-cell *matHeaderCellDef> Empresa </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.company | appTruncate"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="country">
              <th mat-header-cell *matHeaderCellDef> País </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.country | appTruncate"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="message">
              <th mat-header-cell *matHeaderCellDef> Mensaje </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.message | appTruncate"></div> 
            </td>
            </ng-container>
          
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>  </th>
              <td mat-cell *matCellDef="let element"> 
                <button (click)="viewContacto(element)" mat-mini-fab color="primary">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button (click)="deleteContacto(element.id)" mat-mini-fab class="icon-delete-user">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

            @if (this.dataSource.filter) {
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell" colspan="4" style="padding: 1rem;">No se encontro el contacto "{{input.value}}"</td>
              </tr>
            }
          </table>
        </div>
        <mat-paginator #paginator [length]="this.contactos().length"
              [pageSize]="5"
              [pageSizeOptions]="[5, 10, 50]"
              aria-label="Select page">
        </mat-paginator>
      </div>

      </div>
  }
  
  `,
  styleUrl: './contactos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactosComponent implements OnInit {
  cargandoData: boolean = true;
  dataSource!: MatTableDataSource<any>;
  dialog = inject(MatDialog);
  private paginator!: MatPaginator;
  displayedColumns: string[] = ['created_at', 'name', 'email', 'company', 'country', 'message', 'actions'];
  cdrService = inject(ChangeDetectorRef);
  contactsService = inject(ContactsService);
  contactos: any = signal(null);

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.cargandoData = true;
    this.contactsService.getContacts()
      .subscribe((info: any) => {
        this.contactos.set(info)
        this.dataSource = new MatTableDataSource(info);
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer contactos', error);
        this.cargandoData = false;
      })
  }

  viewContacto(contacto: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogCertification, {
      data: contacto
    });
  }

  deleteContacto(id: number) {
    Swal.fire({
      text: '¿Estás seguro de eliminar el contacto?',
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
        this.contactsService.deleteContact(id)
          .subscribe(resp => {
            Swal.fire({
              text: 'Contacto eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getContacts();
          }, (error) => {
            Swal.fire({
              text: 'Error al eliminar el contacto',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getContacts();
          })
      }
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
  selector: 'dialog-content-example-dialog-contacts',
  template: `
     <h2 mat-dialog-title>Info Contacto</h2>
    <mat-dialog-content class="mat-typography">
      <div class="datos">
        <div class="campo">
          <label>Fecha</label>
          <p>{{ data.created_at | date: 'dd/MM/YYYY' }}</p> 
        </div>
  
        <div class="campo">
          <label>Nombre</label>
          <p>{{ data.name }}</p>
        </div>

        <div class="campo">
          <label>Email</label>
          <p>{{ data.email }}</p>
        </div>
        
        <div class="campo">
          <label>Empresa</label>
          <p>{{ data.company }}</p>
        </div>

        <div class="campo">
          <label>País</label>
          <p>{{ data.country }}</p>
        </div>

        <div class="campo">
          <label>País</label>
          <p>{{ data.country }}</p>
        </div>
        
        <div class="campo">
          <label>Mensaje</label>
          <p>{{ data.message }}</p>
        </div>
      </div>
  </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Salir</button>
    </mat-dialog-actions>
  
  `,
  standalone: true,
  styles: `
    .avatar-btn {
      margin-bottom: 1.2rem;
      width: 100%
    }

    .datos {
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
    
    .campo-img, .campo-fecha {
      margin-bottom: 1rem;
    }

    .campo-img img {
      width: 8rem;
      cursor: pointer
    }

    .form-control:focus {
      background-color: transparent!important;
    }

    .cargando {
      padding: 3rem 6rem
    }

    .campo:not(:last-of-type) {
      margin-bottom: 1.2rem
    }
  
  `,

  imports: [MatDialogModule, MatButtonModule, DatePipe],
})
export class DialogContentExampleDialogCertification implements OnInit {
  cargandoData: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }
}
