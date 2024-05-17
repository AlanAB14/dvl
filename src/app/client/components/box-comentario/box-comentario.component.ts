import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-comentario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="box-qualification">
    <div class="stars">
      @for (item of counter(stars); track $index) {
        <img src="assets/imgs/star.png" alt="">
      }
    </div>
    <div class="text"><p>{{ text }}</p></div>
    <div class="info">
      <img [src]="img ?? 'assets/imgs/gris.jpg'" alt="">
      <div class="data">
        <div class="name">
          <p>{{ name }}</p>
        </div>
        <div class="profession">
          <p>{{ profession }}</p>
        </div>
      </div>
    </div>
  </div>`,
  styleUrl: './box-comentario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComentarioComponent {
  @Input() stars!: number;
  @Input() text!: string;
  @Input() name!: string;
  @Input() profession!: string;
  @Input() img!: string;

  counter(i: number) {
    return new Array(i);
}

}
