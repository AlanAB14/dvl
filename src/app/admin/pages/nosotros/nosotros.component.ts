import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { NosotrosService } from '../../../services/nosotros.service';
import { UsersService } from '../../../services/users.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HtmlEditorComponent } from '../../components/html-editor/html-editor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatProgressSpinner,
    MatTooltip,
    MatTableModule,
    TruncatePipe,
    MatButtonModule
  ],
  template: `
  @if (cargandoData && !this.nosotros()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.nosotros()) {
    
    <div class="users">
      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef> Título </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.title | appTruncate"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="subtitle">
              <th mat-header-cell *matHeaderCellDef> Subtítulo </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.subtitle | appTruncate"></div> 
            </td>
            </ng-container>
            
            <ng-container matColumnDef="image">
              <th mat-header-cell *matHeaderCellDef> Imágen </th>
              <td mat-cell *matCellDef="let element">
                <img class="img-table" [src]="element.image" alt="img">
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
                <button (click)="editNosotros(element)" mat-mini-fab color="primary">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>
          
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </div>

      </div>
  }`,
  styleUrl: './nosotros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NosotrosComponent implements OnInit{
  cargandoData: boolean = true;
  nosotros: any = signal(null);
  users = signal<any[]>([]);
  nosotrosService = inject(NosotrosService);
  usersService = inject(UsersService);
  dataSource!: MatTableDataSource<any>;
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['title', 'subtitle', 'image', 'text', 'updated_by', 'actions'];


  ngOnInit(): void {
    this.getNosotros();
  }

  getNosotros() {
    this.users.set([]);
    this.cargandoData = true;
    this.nosotrosService.getInfoUs()
      .subscribe((info: any) => {
        console.log(info)
        this.nosotros.set(info)
        this.dataSource = new MatTableDataSource(info);
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer nosotros', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.nosotros().map((info: any) => {
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

  editNosotros(item: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogNosotros, {
      data: {id: item.id, nosotros: item, action: 'edit'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getNosotros()
      }
    });
  }

}



@Component({
  selector: 'dialog-content-example-dialog-nosotros',
  template: `
    @if(cargandoData) {
      <div class="cargando">
        <mat-spinner></mat-spinner>
    </div>
    } @else {
      @if(data) {
        <h2 mat-dialog-title>Editar Nosotros</h2>
        <mat-dialog-content class="mat-typography">
        <form [formGroup]="nosotrosForm">
          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Título</mat-label>
            <input formControlName="title" matInput>
          </mat-form-field>
          </div>
    
          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Subtítulo</mat-label>
            <input formControlName="subtitle" matInput>
          </mat-form-field>
          </div>
    
          <div class="campo-img">
          @if (nosotrosForm.get('image')!.value) {
               <label>Imágen</label>
               <img (click)="compressFile()" [src]="nosotrosForm.get('image')!.value" alt="avatar">
           } @else {
             <button mat-raised-button color="primary" (click)="compressFile()">Agregar Imágen de nosotros</button>
           }
          </div>
    
    
          <div class="campo">
            <app-html-editor [text]="nosotrosForm.get('text')!.value" (sendData)="recibeData($event)" />
          </div>
        </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Salir</button>
          <button mat-raised-button color="primary" (click)="editPolicy()" [disabled]="nosotrosForm.valid && nosotrosForm.pristine!">Editar</button>
        </mat-dialog-actions>
      }
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

    .campo-img {
      margin-bottom: 1rem;
    }

    .campo-img img {
      width: 8rem;
      cursor: pointer
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
    .cargando {
      padding: 3rem 6rem
    }
  
  `,
  imports: [MatDialogModule, HtmlEditorComponent, MatButtonModule,MatProgressSpinner, ReactiveFormsModule, MatInputModule],
})
export class DialogContentExampleDialogNosotros implements OnInit {
  cargandoData: boolean = false;
  nosotrosService = inject(NosotrosService);
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  imageCompressService = inject(NgxImageCompressService);

  nosotrosForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    subtitle: [''],
    image: [null, Validators.required],
    text: ['', Validators.required]
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    if (this.data && this.data.action === 'edit') {
      this.nosotrosForm.patchValue({
        title: this.data.nosotros.title ?? null,
        subtitle: this.data.nosotros.subtitle ?? null,
        image: this.data.nosotros.image ?? null,
        text: this.data.nosotros.text ?? null
      })
    }
  }


  editPolicy() {
    if (!this.nosotrosForm.valid) {
      return
    }
    this.cargandoData = true;
    this.nosotrosService.editInfoUs(this.data.id, this.nosotrosForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Información editada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: '',
          },
        });
        this.cargandoData = false;
        this.dialogRef.close({ success: true });
      }, (error) => {
        Swal.fire({
          text: 'Error al editar información',
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

  compressFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService
        .compressFile(image, orientation, 100, 90) // 50% ratio, 80% quality
        .then(compressedImage => {
          this.nosotrosForm.patchValue({
            image: compressedImage
          })
          this.nosotrosForm.markAsDirty();
          this.cdr.detectChanges();
        });
    });
  }

  recibeData(data: string) {
    this.nosotrosForm.patchValue({
      text: data
    })
    this.nosotrosForm.markAsDirty();
    this.cdr.detectChanges();
  }

}
