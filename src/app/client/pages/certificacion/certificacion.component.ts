import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificationsService } from '../../../services/certifications.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificacion.component.html',
  styleUrl: './certificacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificacionComponent {
  certificacion!: any;
    cargando!: boolean;
    constructor(private route: ActivatedRoute,
      private router: Router,
      private certificationsService: CertificationsService,
      public dialog: MatDialog) { }

    ngOnInit() {
      this.cargando = true;
      const id = this.route.snapshot.paramMap.get('id');
      try {
        if (id) {
          this.getCertificacion(Number(id));
        } else {
          this.router.navigate(['/']);
        }
        this.cargando = false;
      } catch (error) {
        this.cargando = false;
        this.router.navigate(['/'])
      }
    };

    getCertificacion(id: number) {
      this.certificationsService.getCertification(id)
        .subscribe((data: any) => {
          if (!data) {
            this.router.navigate(['/']);
          }
          this.certificacion = data;
          this.cargando = false;
        }, (error) => {
          this.router.navigate(['/']);
          console.error('Error al obtener la certificación:', error);
          this.cargando = false;
        });
    }

    verImagen() {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: this.certificacion.image,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
      <mat-dialog-content class="mat-typography">
        <img class="imagen-completa" [src]="data" />
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button style="outline: none" color="primary" mat-dialog-close>Salir</button>
      </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
})
export class DialogOverviewExampleDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
