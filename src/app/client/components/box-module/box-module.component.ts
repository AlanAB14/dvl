import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-module',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
   <div class="box">
    <div class="box-icon">
        <img [src]="icon" alt="">
    </div>
    <div class="box-content">
        <div class="box-content-title">
            <p>{{ title }}</p>
        </div>
        <div class="box-content-text">
            <p>{{ text }}</p>
        </div>
    </div>
    @if (pdf) {
          <div class="box-content-pdf">
            <div class="btn-pdf">
                <a [href]="pdf" target="_blank">Ver más</a>
            </div>
          </div>
        }
  </div>
  `,
  styleUrl: './box-module.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxModuleComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() text!: string;
  @Input() pdf!: string | undefined;
}
