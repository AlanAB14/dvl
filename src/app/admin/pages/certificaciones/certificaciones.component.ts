import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users.service';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CertificationsService } from '../../../services/certifications.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { getSpainPaginatorIntl } from '../../../utils/translate-paginator';
import { HtmlEditorComponent } from '../../components/html-editor/html-editor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    TruncatePipe,
    MatTooltipModule,
    MatIcon,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],
  template: `
  @if (cargandoData && !this.certifications()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.certifications()) {
    
    <div class="users">
      <div class="box-agregar-usuario">
        <button mat-raised-button color="primary" (click)="agregarCertificacion()">Agregar Certificación</button>
      </div>

      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Fecha </th>
              <td mat-cell *matCellDef="let element"> {{element.date | date:'dd/MM/YYYY'}} </td>
            </ng-container>
          
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef> Título </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.title | appTruncate"></div> 
            </td>
            </ng-container>
            
            <ng-container matColumnDef="img_preview">
              <th mat-header-cell *matHeaderCellDef> Imágen previsualización </th>
              <td mat-cell *matCellDef="let element">
                <img class="img-table" [src]="element.img_preview" alt="img">
              </td>
            </ng-container>

            <ng-container matColumnDef="text">
              <th mat-header-cell *matHeaderCellDef> Texto </th>
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
                <button (click)="editCertificacion(element.id, element)" mat-mini-fab color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button (click)="deleteCertificacion(element.id)" mat-mini-fab class="icon-delete-user">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
        <mat-paginator #paginator [length]="this.certifications().length"
              [pageSize]="5"
              [pageSizeOptions]="[5, 10, 50]"
              aria-label="Select page">
        </mat-paginator>
      </div>

      </div>
  }
  `,
  styleUrl: './certificaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class CertificacionesComponent implements OnInit {
  cargandoData: boolean = true;
  users = signal<any[]>([]);
  certifications: any = signal(null);
  usersService = inject(UsersService);
  certificationsService = inject(CertificationsService);
  dataSource!: MatTableDataSource<any>;
  dialog = inject(MatDialog);
  private paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'title', 'img_preview', 'text', 'updated_by', 'actions'];
  cdrService = inject(ChangeDetectorRef);

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCertifications();
  }

  getCertifications() {
    this.users.set([]);
    this.cargandoData = true;
    this.certificationsService.getCertifications()
      .subscribe((info: any) => {
        console.log(info)
        this.certifications.set(info)
        this.dataSource = new MatTableDataSource(info);
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer certificaciones', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.certifications().map((info: any) => {
      return this.usersService.getUser(info.updated_by);
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
    const elemento = this.users().find((item: any) => item.user_id === id);
    return elemento;
  }

  agregarCertificacion() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogCertification, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCertifications()
      }
    });
  }

  editCertificacion(id: number, certificacion: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogCertification, {
      data: { id, certificacion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCertifications()
      }
    });
  }

  deleteCertificacion(id: number) {
    Swal.fire({
      text: '¿Estás seguro de eliminar la certificación?',
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
        this.certificationsService.deleteCertifications(id)
          .subscribe(resp => {
            Swal.fire({
              text: 'Certificación eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getCertifications();
          }, (error) => {
            Swal.fire({
              text: 'Error al eliminar la certificación',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getCertifications();
          })
      }
    });
  }
}



@Component({
  selector: 'dialog-content-example-dialog-certifications',
  template: `
   @if(!data) {
     <h2 mat-dialog-title>Agregar Certificación</h2>
    }@else {
     <h2 mat-dialog-title>Editar Certificación</h2>
   }
    <mat-dialog-content class="mat-typography">
    <form [formGroup]="certificationForm">

      <div class="campo campo-fecha">
      <mat-form-field class="example-full-width">
        <mat-label>Fecha</mat-label>
        <input name="myDate" matInput [matDatepicker]="picker"
        class="form-control" placeholder="Ingrese la fecha"  
        formControlName="date">
        <mat-hint>DD/MM/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      </div>

      <div class="campo">
      <mat-form-field class="example-full-width">
        <mat-label>Título</mat-label>
        <input formControlName="title" matInput>
      </mat-form-field>
      </div>

      
      <div class="campo-img">
        @if (certificationForm.get('img_preview')!.value) {
          <label>Imágen de presiualización</label>
          <img (click)="compressFile('img_preview')" [src]="certificationForm.get('img_preview')!.value" alt="img_preview">
        } @else {
        <button mat-raised-button color="primary" (click)="compressFile('img_preview')">Agregar Imágen de Previsualización</button>
      }
      </div>
      
      <div class="campo-img">
      @if (certificationForm.get('image')!.value) {
          <label>Imágen</label>
          <img (click)="compressFile('image')" [src]="certificationForm.get('image')!.value" alt="image">
      } @else {
        <button mat-raised-button color="primary" (click)="compressFile('image')">Agregar Imágen</button>
      }
      </div>
      
      <div class="campo">
        <app-html-editor [text]="certificationForm.get('text')!.value" (sendData)="recibeData($event)" />
      </div>
    </form>
  </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Salir</button>
      @if(!data) {
        <button mat-raised-button color="primary" (click)="addCertificacion()" [disabled]="!certificationForm.valid">Agregar</button>
      }@else {
      <button mat-raised-button color="primary" (click)="editCertificaction()" [disabled]="!certificationForm.valid">Editar</button>
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
  
  `,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  imports: [MatDialogModule, HtmlEditorComponent, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
})
export class DialogContentExampleDialogCertification implements OnInit {
  cargandoData: boolean = false;
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  imageCompressService = inject(NgxImageCompressService);
  certificationService = inject(CertificationsService)

  certificationForm: FormGroup = this.fb.group({
    date: ['', Validators.required],
    title: ['', Validators.required],
    img_preview: ['', Validators.required],
    image: ['', Validators.required],
    text: [null, Validators.required]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.certificationForm.patchValue({
      date: this.data.certificacion.date ?? null,
      title: this.data.certificacion.title ?? null,
      img_preview: this.data.certificacion.img_preview ?? null,
      image: this.data.certificacion.image ?? null,
      text: this.data.certificacion.text ?? null
    })
  }

  addCertificacion() {
    this.certificationService.addCertification(this.certificationForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Certificación agregada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.dialogRef.close({ success: true });
      }, (error) => {
        Swal.fire({
          text: 'Error al agregar certificación',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        console.log(error)
      })
  }

  editCertificaction() {
    this.certificationService.editCertifications(this.data.id, this.certificationForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Certificación editada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.dialogRef.close({ success: true });
      }, (error) => {
        Swal.fire({
          text: 'Error al editar certificación',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        console.log(error)
      })
  }

  compressFile(tipo: string) {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService
        .compressFile(image, orientation, 100, 80) // 50% ratio, 80% quality
        .then(compressedImage => {
          if (tipo === 'img_preview') {
            this.certificationForm.patchValue({
              img_preview: compressedImage
            })
          } else if (tipo === 'image') {
            this.certificationForm.patchValue({
              image: compressedImage
            })
          }
          this.certificationForm.markAsDirty();
          this.cdr.detectChanges();
        });
    });
  }

  recibeData(data: string) {
    this.certificationForm.patchValue({
      text: data
    })
  }

}
