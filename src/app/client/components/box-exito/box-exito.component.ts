import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-exito',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
          <div class="box">
            <div class="box-logo">
                <img [src]="img" [ngClass]="{'img-nestle': img.includes('nestle')}" alt="">
            </div>
            <div class="box-content">
                <div class="box-content-data">
                    <p class="box-title">PROBLEMÁTICA:</p>
                    <ul>
                        @for (item of problematica; track $index) {
                          <li>» {{ item }}</li>
                        }
                    </ul>
                </div>
                <div class="box-content-data">
                    <p class="box-title">SOLUCIÓN APLICADA:</p>
                    <ul>
                        @for (item of solucion; track $index) {
                          <li>» {{ item }}</li>
                        }
                    </ul>
                </div>
                <div class="box-content-data">
                    <p class="box-title">RESULTADOS:</p>
                    <ul>
                        @for (item of resultados; track $index) {
                          <li>» {{ item }}</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
  `,
  styleUrl: './box-exito.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxExitoComponent {
  @Input() img!: string;
  @Input() problematica!: string[];
  @Input() solucion!: string[];
  @Input() resultados!: string[];
}
