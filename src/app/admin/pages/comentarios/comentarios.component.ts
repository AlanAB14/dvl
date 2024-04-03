import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, inject, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { CommentsService } from '../../../services/comments.service';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxImageCompressService } from 'ngx-image-compress';
import Swal from 'sweetalert2';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    TruncatePipe,
    MatTooltipModule,
    MatIcon,
    MatButtonModule
  ],
  template: `
  @if (cargandoData && !this.comments()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }

  @if (!cargandoData && this.comments()) {
    
    <div class="users">
      
      <div class="table-users" class="mat-elevation-z8">

        <div>
          <table mat-table [dataSource]="dataSource" matSort>
          
            <ng-container matColumnDef="stars">
              <th mat-header-cell *matHeaderCellDef> Estrellas </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.stars"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef> Texto </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.title | appTruncate"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Nombre </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.name"></div> 
            </td>
            </ng-container>

            <ng-container matColumnDef="profession">
              <th mat-header-cell *matHeaderCellDef> Profesión </th>
              <td mat-cell *matCellDef="let element">
                <div [innerHTML]="element.profession"></div> 
            </td>
            </ng-container>
            
            <ng-container matColumnDef="avatar">
              <th mat-header-cell *matHeaderCellDef> Imágen </th>
              <td mat-cell *matCellDef="let element">
                <img class="img-table" [src]="element.avatar" alt="img">
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
                <button (click)="editComments(element)" mat-mini-fab color="primary">
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
  }
  `,
  styleUrl: './comentarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComentariosComponent implements OnInit{
  cargandoData: boolean = true;
  users = signal<any[]>([]);
  comments: any = signal(null);
  usersService = inject(UsersService);
  commentsService = inject(CommentsService);
  dataSource!: MatTableDataSource<any>;
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['stars', 'title', 'name', 'profession', 'avatar', 'updated_by', 'actions'];
  
  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.users.set([]);
    this.cargandoData = true;
    this.commentsService.getComments()
      .subscribe((info: any) => {
        console.log(info)
        this.comments.set(info)
        this.dataSource = new MatTableDataSource(info);
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer comments', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.comments().map((info: any) => {
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

  editComments(comment: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComments, {
      data: {id: comment.id, nosotros: comment}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getComments()
      }
    });
  }
}


@Component({
  selector: 'dialog-content-example-dialog-comments',
  template: `
    @if(cargandoData) {
      <div class="cargando">
        <mat-spinner></mat-spinner>
    </div>
    } @else {
      @if(data) {
        <h2 mat-dialog-title>Editar Comentario</h2>
        <mat-dialog-content class="mat-typography">
        <form [formGroup]="commentForm">

          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Estrellas</mat-label>
            <mat-select formControlName="stars">
              <mat-option value="1">1</mat-option>
              <mat-option value="2">2</mat-option>
              <mat-option value="3">3</mat-option>
              <mat-option value="4">4</mat-option>
              <mat-option value="5">5</mat-option>
            </mat-select>
          </mat-form-field>
          </div>
    
          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Texto</mat-label>
            <input formControlName="title" matInput>
          </mat-form-field>
          </div>
    
          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Nombre</mat-label>
            <input formControlName="name" matInput>
          </mat-form-field>
          </div>

          <div class="campo">
          <mat-form-field class="example-full-width">
            <mat-label>Profesión</mat-label>
            <input formControlName="profession" matInput>
          </mat-form-field>
          </div>
    
          <div class="campo-img">
          @if (commentForm.get('avatar')!.value) {
               <label>Imágen</label>
               <img (click)="compressFile()" [src]="commentForm.get('avatar')!.value" alt="avatar">
           } @else {
             <button mat-raised-button color="primary" (click)="compressFile()">Agregar Imágen de Avatar</button>
           }
          </div>
    
        </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Salir</button>
          <button mat-raised-button color="primary" (click)="editPolicy()" [disabled]="commentForm.valid && commentForm.pristine!">Editar</button>
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
  imports: [MatDialogModule,  MatButtonModule, MatProgressSpinner, ReactiveFormsModule, MatInputModule, MatSelectModule],
})
export class DialogContentExampleDialogComments implements OnInit {
  cargandoData: boolean = false;
  commentsService = inject(CommentsService);
  dialogRef = inject(MatDialogRef);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  imageCompressService = inject(NgxImageCompressService);

  commentForm: FormGroup = this.fb.group({
    stars: ['', Validators.required],
    title: ['', Validators.required],
    name: ['', Validators.required],
    profession: ['', Validators.required],
    avatar: [null, Validators.required]
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
      this.commentForm.patchValue({
        stars: this.data.nosotros.stars ?? null,
        title: this.data.nosotros.title ?? null,
        name: this.data.nosotros.name ?? null,
        profession: this.data.nosotros.profession ?? null,
        avatar: this.data.nosotros.avatar ?? null
      })
  }

  editPolicy() {
    if (!this.commentForm.valid) {
      return
    }
    this.cargandoData = true;
    this.commentsService.editComments(this.data.id, this.commentForm.value)
      .subscribe(resp => {
        Swal.fire({
          text: 'Comentario editado con éxito',
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
          text: 'Error al editar comentario',
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
        .compressFile(image, orientation, 100, 80) // 50% ratio, 80% quality
        .then(compressedImage => {
          this.commentForm.patchValue({
            avatar: compressedImage
          })
          this.commentForm.markAsDirty();
          this.cdr.detectChanges();
        });
    });
  }
}

