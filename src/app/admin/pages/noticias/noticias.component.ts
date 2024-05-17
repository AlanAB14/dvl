import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewsService } from '../../../services/news.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../../services/users.service';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { getSpainPaginatorIntl } from '../../../utils/translate-paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HtmlEditorComponent } from '../../components/html-editor/html-editor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from 'sweetalert2';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    TruncatePipe
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],

  template: `@if (cargandoData && !this.news()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.news()) {
    
    <div class="users">
      <div class="box-agregar-usuario">
        <button mat-raised-button color="primary" (click)="agregarNoticia()">Agregar Noticia</button>
      </div>
      <mat-form-field>
        <mat-label>Buscar</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Texto" #input>
      </mat-form-field>
      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> Id </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
            </ng-container>
          
            <ng-container matColumnDef="img_preview">
              <th mat-header-cell *matHeaderCellDef> Imágen presentación </th>
              <td mat-cell *matCellDef="let element"> 
                @if(element.img_preview) {
                  <img class="img-table" [src]="element.img_preview" alt="img_preview">
                }  
              </td>
            </ng-container>
          
            <ng-container matColumnDef="image">
              <th mat-header-cell *matHeaderCellDef> Imágen noticia </th>
              <td mat-cell *matCellDef="let element"> 
              @if(element.image) {
                  <img class="img-table" [src]="element.image" alt="image">
              }  
              </td>
            </ng-container>

            <ng-container matColumnDef="text">
              <th mat-header-cell *matHeaderCellDef> Texto noticia </th>
              <td mat-cell *matCellDef="let element"> <div [innerHTML]="element.text | appTruncate"></div></td>
            </ng-container>
          
            <ng-container matColumnDef="updated_by">
              <th mat-header-cell *matHeaderCellDef> Última edición </th>
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
                <button (click)="editNew(element)" class="button-table-icon" mat-mini-fab color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
                <button (click)="deleteNew(element.id)" mat-mini-fab class="button-table-icon icon-delete-user">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="4" style="padding: 1rem;">No se encontro la noticia "{{input.value}}"</td>
            </tr>
          </table>
        </div>
        <mat-paginator #paginator [length]="this.news().length"
              [pageSize]="5"
              [pageSizeOptions]="[5, 10, 50]"
              aria-label="Select page">
        </mat-paginator>
      </div>

      </div>
            }
      `
  ,
  styleUrl: './noticias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoticiasComponent implements OnInit {
  cargandoData: boolean = true;
  news: any = signal(null);
  users = signal<any[]>([]);
  newsService = inject(NewsService);
  usersService = inject(UsersService);
  dialog = inject(MatDialog);

  private paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'img_preview', 'image', 'text', 'updated_by', 'actions'];

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getNoticias()
  }

  getNoticias() {
    this.users.set([]);
    this.cargandoData = true;
    this.newsService.getNews()
      .subscribe((news: any) => {
        this.news.set(news)
        this.dataSource = new MatTableDataSource(news);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer noticias', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.news().map((noticia: any) => {
      return this.usersService.getUser(noticia.updated_by);
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

  agregarNoticia() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogNoticias);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getNoticias()
      }
    });
  }

  editNew(notice: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogNoticias, {
      data: {id: notice.id, notice, action: 'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getNoticias()
      }
    });
  }

  deleteNew(id: number) {
    Swal.fire({
      text: '¿Estás seguro de eliminar la noticia?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: '',
      }
    }).then((resp) => {
      if (resp.isConfirmed) {
        Swal.fire({
          html: `<div style="display:flex; justify-content:center"><img src="assets/imgs/loader.gif" /></div>`,
          showConfirmButton: false
        })
        this.newsService.deleteNew(id)
          .subscribe(resp => {
            Swal.fire({
              text: 'Noticia eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getNoticias();
          }, (error) => {
            Swal.fire({
              text: 'Error al eliminar la noticia',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getNoticias();
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
  selector: 'dialog-content-example-dialog-noticias',
  template: `
  @if(cargandoData) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }@else {
    @if(!data) {
      <h2 mat-dialog-title>Agregar Noticia</h2>
     }@else if(data.action === 'edit') {
      <h2 mat-dialog-title>Editar Noticia</h2>
    }
     <mat-dialog-content class="mat-typography">
     <form [formGroup]="noticiaForm">
     <div class="campo-dialog">
      <label>Imágen de presentación</label>
       @if (noticiaForm.get('img_preview')!.value) {
           <img (click)="compressFile('img_preview')" [src]="noticiaForm.get('img_preview')!.value" alt="avatar">
       } @else {
         <button mat-raised-button color="primary" (click)="compressFile('img_preview')">Agregar Imágen de presentación</button>
       }
     </div>
 
     <div class="campo-dialog">
     <label>Imágen de noticia</label>
       @if (noticiaForm.get('image')!.value) {
           <img (click)="compressFile('image')" [src]="noticiaForm.get('image')!.value" alt="avatar">
       } @else {
         <button mat-raised-button color="primary" (click)="compressFile('image')">Agregar Imágen de noticia</button>
       }
     </div>
     <app-html-editor [text]="noticiaForm.get('text')!.value" (sendData)="recibeData($event)" />
     </form>
     </mat-dialog-content>
     <mat-dialog-actions align="end">
       <button mat-button mat-dialog-close>Salir</button>
       @if(!data) {
         <button mat-raised-button color="primary" (click)="addNoticia()" [disabled]="noticiaForm.get('text')!.value === ''">Agregar</button>
       }@else if(data.action === 'edit') {
       <button mat-raised-button color="primary" (click)="editPolicy()" [disabled]="noticiaForm.get('text')!.value === '' || noticiaForm.get('text')!.value === data.text">Editar</button>
    }
     </mat-dialog-actions>
  }
  
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
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .campo-dialog img {
      width: 8rem;
      margin-bottom: 1.2rem;
      cursor: pointer
    }

    .cargando {
      padding: 3rem 6rem
    }
  
  `,
  imports: [MatDialogModule, HtmlEditorComponent, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatProgressSpinner],
})
export class DialogContentExampleDialogNoticias implements OnInit {
  imgResultBeforeCompression: any = signal(null);
  imgResultAfterCompression: any = signal(null);
  cargandoData: boolean = false;
  newsService = inject(NewsService);
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  imageCompressService = inject(NgxImageCompressService);
  
  noticiaForm: FormGroup = this.fb.group({
    img_preview: [null, Validators.required],
    image: [null, Validators.required],
    text: ['', Validators.required]
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data && this.data.action === 'edit') {
      this.noticiaForm.patchValue({
        img_preview: this.data.notice.img_preview ?? null,
        image: this.data.notice.image ?? null,
        text: this.data.notice.text
      })
    }
  }

  addNoticia() {
    console.log(this.noticiaForm.value)
    if (!this.noticiaForm.valid) {
      return
    }
    this.cargandoData = true;
    this.newsService.addNew(this.noticiaForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Noticia agregada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.cargandoData = true;
        this.dialogRef.close({ success: true });
      }, (error) => {
        Swal.fire({
          text: 'Error al agregar noticia',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.cargandoData = true;
        console.log(error)
      })
  }

  compressFile(tipo: string) {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompression.set(image)
      // console.log('Size in bytes of the uploaded image was:', this.imageCompressService.byteCount(image));
      this.imageCompressService
        .compressFile(image, orientation, 50, 80) // 50% ratio, 80% quality
        .then(compressedImage => {
          this.imgResultAfterCompression.set(compressedImage)
          // console.log('Size in bytes after compression is now:', this.imageCompressService.byteCount(compressedImage));
          if (tipo === 'img_preview') {
            this.noticiaForm.patchValue({
              img_preview: compressedImage
            })
          }else if ('image') {
            this.noticiaForm.patchValue({
              image: compressedImage
            })
          }
          this.noticiaForm.markAsDirty();
          this.cdr.detectChanges();
        });
    });
  }

  editPolicy() {
    if (!this.noticiaForm.valid) {
      return
    }
    this.cargandoData = true;
    this.newsService.editNew(this.data.id, this.noticiaForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Noticia editada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.cargandoData = false;
        this.dialogRef.close({success: true});
      }, (error) => {
        Swal.fire({
          text: 'Error al editar noticia',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.cargandoData = false;
        console.log(error)
      })
  }

  recibeData(data: string) {
    this.noticiaForm.patchValue({
      text: data
    })
  }

}
