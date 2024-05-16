import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
    
  ],
  template: `
    @if (!cargando) {
      <div class="certificacion-box">
        <div class="certificacion-box-img">
          <img (click)="verImagen()" [src]="certificacion.img" alt="">
        </div>
        <div class="certificacion-box-content">
          <div class="certificacion-box-content--title">
            <p>{{ certificacion.title }}</p>
          </div>
          <div class="certificacion-box-content--date">
            <p>{{ certificacion.date | date:'dd/MM/YYYY' }}</p>
          </div>
          <div class="certificacion-box-content--text">
            <p [innerHTML]="certificacion.text"></p>
          </div>
        </div>
      </div>
    }@else  {
      <div class="loader-dvl-box">
        <div class="loader-dvl"></div>
      </div>
    }



    `,
  styleUrl: './certificaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificacionesComponent {
  certificacion!: any;
  cargando!: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = true;
    console.log(this.certificacion)
    const data = atob(this.route.snapshot.paramMap.get('c')!)
    try {
      this.certificacion = JSON.parse(data)
      console.log(this.certificacion)
      this.cargando = false;
    } catch (error) {
      this.cargando = false;
      this.router.navigate(['/'])
    }
  };

  verImagen() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.certificacion.img,
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