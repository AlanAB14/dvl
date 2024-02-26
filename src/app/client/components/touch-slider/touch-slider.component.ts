import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, Input, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router, RouterModule } from '@angular/router';

register();

export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-touch-slider',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  templateUrl: './touch-slider.component.html',
  styleUrl: './touch-slider.component.scss',
})
export class TouchSliderComponent{
  @Input() categoria!: string;
  @Input() images: Slide[] = [];
  @Input() info: any[] = [];
  activeSlideIndex: number = 1;
  slidesPerView!: number;
  screenWidth!: number;
  router = inject(Router)

  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1080) {
      this.slidesPerView = 1
    }
    if (this.screenWidth > 1080) {
      this.slidesPerView = 3
    }
  }

  goToCertificacion(certificacion: any) {
    const data = certificacion;
    const url = this.router.serializeUrl(this.router.createUrlTree(['certificaciones', { c: btoa(JSON.stringify(data)) }]));
    window.open(`${url}`, '_self');
  }

}
