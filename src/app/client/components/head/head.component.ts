import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
  <div class="head-section animate__animated animate__fadeIn" [ngClass]="{'theme-satelital': esSatelital, 'theme-novedades': esNovedades}">

    <div class="head-section__text animate__animated animate__backInLeft">
      <div class="somos">
          <div class="line"></div>
          <p>SOMOS <strong>DVL</strong></p>
      </div>
      <div class="title">
          <p>{{ title }}</p>
      </div>
      <div class="subtitle">
          <p>{{ subtitle }}</p>
      </div>
      @if (subtitleStrong) {
        <div class="subtitle-strong">
          <p>{{ subtitleStrong }}</p>
        </div>
      }
      <!-- <div class="buttons">
        <button class="info">Más info</button>
        <button class="videos">Show Videos</button>
      </div> -->
    </div>
    <div class="head-section__image">
      <img [src]="image" alt="imagen">
    </div>
  </div>
      @if(!esNovedades) {
        <div class="head-section-switch animate__animated animate__fadeIn" [ngClass]="{'theme-satelital': esSatelital}">
          <input type="checkbox" id="toggle" class="toggleCheckbox" (change)="onToggleChange()" [checked]="!dvlIot" />
            <label for="toggle" class="toggleContainer">
              <div>IOT</div> 
              <div>MONITOREO</div>
            </label>
        </div>
      }
  `,
  styleUrl: './head.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadComponent{
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() subtitleStrong!: string;
  @Input() image!: string;
  @Input() esNovedades: boolean = false;
  esSatelital: boolean = false;
  dvlIot!: boolean;

  constructor(private router: Router) {
    const currentUrl = this.router.url;
    this.esSatelital = currentUrl === '/monitoreo-flota';
    this.dvlIot = currentUrl === '/iot';
    console.log(this.dvlIot)
  }

  onToggleChange(): void {
    this.dvlIot = !this.dvlIot
    console.log('El valor del toggle es: ', this.dvlIot);

    if (!this.dvlIot) {
      this.router.navigateByUrl('/monitoreo-flota');
    } else {
      this.router.navigateByUrl('/iot');
    }

  }

}
