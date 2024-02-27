import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-reflect',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="box">
      <div class="box-icon">
        <img [src]="icon" [style.padding]="icon === 'assets/imgs/iot-icons/sustentabilidad.svg' ? '3px' : '0'" alt="">
      </div>
      <div class="box-title">
        <p>
          {{ title }}
        </p>
      </div>
    </div>
  `
  ,
  styleUrl: './box-reflect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxReflectComponent {
  @Input() icon!: string;
  @Input() title!: string;

}
