import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PoliciesService } from '../../../services/policies.service';
import { HtmlEditorComponent } from '../../components/html-editor/html-editor.component';
import { getSpainPaginatorIntl } from '../../../utils/translate-paginator';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, forkJoin, map } from 'rxjs';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-politicas',
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
    MatTooltipModule,
    TruncatePipe,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],
  template: `
  @if (cargandoData && !this.policies()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.policies()) {
    
    <div class="users">
      <div class="box-agregar-usuario">
        <button mat-raised-button color="primary" (click)="agregarPolitica()">Agregar Politica</button>
      </div>

      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> Id </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
            </ng-container>
          
            <ng-container matColumnDef="text">
              <th mat-header-cell *matHeaderCellDef> Contenido </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.text | appTruncate"></div> 
            </td>
            </ng-container>
          
            <ng-container matColumnDef="updated_by">
              <th mat-header-cell *matHeaderCellDef> Ultima edición </th>
              <td mat-cell *matCellDef="let element"> 
              @if (!cargandoData && users().length > 0) {
                @if (getUserData(element.updated_by).avatar) {
                  <img class="img-avatar" [matTooltip]="getUserData(element.updated_by).username" [src]="getUserData(element.updated_by).avatar" alt="img-user">
                }@else {
                  <mat-icon class="icon-user" [matTooltip]="getUserData(element.updated_by).username">account_circle</mat-icon>
                }
              }@else {
                <mat-spinner class="img-avatar"></mat-spinner>
              }
              </td>
            </ng-container>
          
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>  </th>
              <td mat-cell *matCellDef="let element"> 
                <button (click)="editPolicy(element.id, element.text)" mat-mini-fab color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button (click)="deletePolicy(element.id)" mat-mini-fab class="icon-delete-user">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
        <mat-paginator #paginator [length]="this.policies().length"
              [pageSize]="5"
              [pageSizeOptions]="[5, 10, 50]"
              aria-label="Select page">
        </mat-paginator>
      </div>

      </div>
  }
  
  `,
  styleUrl: './politicas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PoliticasComponent implements OnInit {
  policiesService = inject(PoliciesService);
  usersService = inject(UsersService);
  cargandoData: boolean = true;
  private paginator!: MatPaginator;
  dialog = inject(MatDialog);
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'text', 'updated_by', 'actions'];
  policies: any = signal(null);
  users = signal<any[]>([]);
  cdrService = inject(ChangeDetectorRef);

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies() {
    this.users.set([]);
    this.cargandoData = true;
    this.policiesService.getPolicies()
      .subscribe((policies: any) => {
        console.log(policies)
        this.policies.set(policies)
        this.dataSource = new MatTableDataSource(policies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer politicas', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.policies().map((policy: any) => {
      return this.usersService.getUser(policy.updated_by);
    });

    forkJoin(observablesArray).subscribe(
      (userDataArray: any) => {
        userDataArray.forEach((userData: any) => {
          this.users.update((values: any) => {
            return [...values, userData]
          });
        });
        this.cargandoData = false;
      },
      (error) => {
        console.log('Error en getUsers', error);
        this.cargandoData = false;
      }
    );
  }

  getUserData(id: number) {
    const elemento = this.users().find((item) => item.user_id === id);
    return elemento;
  }

  agregarPolitica() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogPolitica);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPolicies()
      }
    });
  }

  editPolicy(id: number, text: string) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogPolitica, {
      data: {id, text, action: 'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPolicies()
      }
    });
  }

  deletePolicy(id: number) {
    Swal.fire({
      text: '¿Estás seguro de eliminar la política?',
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
        this.policiesService.deletePolicy(id)
          .subscribe(resp => {
            Swal.fire({
              text: 'Política eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getPolicies();
          }, (error) => {
            Swal.fire({
              text: 'Error al eliminar la política',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getPolicies();
          })
      }
    });
  }
}



@Component({
  selector: 'dialog-content-example-dialog-politica',
  template: `
   @if(!data) {
     <h2 mat-dialog-title>Agregar Política</h2>
    }@else if(data.action === 'edit') {
     <h2 mat-dialog-title>Editar Política</h2>
   }
    <mat-dialog-content class="mat-typography">
      <app-html-editor [text]="text()" (sendData)="recibeData($event)" />
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Salir</button>
      @if(!data) {
        <button mat-raised-button color="primary" (click)="addPolicy()" [disabled]="text() === ''">Agregar</button>
      }@else if(data.action === 'edit') {
      <button mat-raised-button color="primary" (click)="editPolicy()" [disabled]="text() === '' || text() === data.text">Editar</button>
   }
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
  imports: [MatDialogModule, HtmlEditorComponent, MatButtonModule],
})
export class DialogContentExampleDialogPolitica implements OnInit {
  text = signal<string>('');
  policiesService = inject(PoliciesService);
  dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data && this.data.action === 'edit') {
      this.text.set(this.data.text)      
    }
  }

  addPolicy() {
    const data = {
      text: this.text()
    }
    this.policiesService.addPolicy(data)
      .subscribe(resp => {
        Swal.fire({
          text: 'Política agregada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.dialogRef.close({success: true});
      }, (error) => {
        Swal.fire({
          text: 'Error al agregar política',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        console.log(error)
      })
  }

  editPolicy() {
    const data = {
      text: this.text()
    }
    this.policiesService.editPolicy(this.data.id, data)
      .subscribe(resp => {
        Swal.fire({
          text: 'Política editada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.dialogRef.close({success: true});
      }, (error) => {
        Swal.fire({
          text: 'Error al editar política',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        console.log(error)
      })
  }

  recibeData(data: string) {
    this.text.set(data)
  }

}
