import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-infinite-slide',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="slider">
    <div class="slide-track">
      @for (item of logos; track $index) {
        <div class="slide">
          <img [src]="item.imgSrc" [alt]="item.imgAlt" />
        </div>
      }
      @for (item of logos; track $index) {
        <div class="slide">
          <img [src]="item.imgSrc" [alt]="item.imgAlt" />
        </div>
      }
    </div>
  </div>
  `,
  styleUrl: './infinite-slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteSlideComponent {
  @Input() logos!: any[];
  
}
