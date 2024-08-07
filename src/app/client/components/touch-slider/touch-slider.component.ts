import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router, RouterModule } from '@angular/router';

register();

export interface Slide {
  imgSrc: string;
  imgPre: string;
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
  encapsulation: ViewEncapsulation.None
})
export class TouchSliderComponent implements OnInit{
  @Input() categoria!: string;
  @Input() images: Slide[] = [];
  @Input() info!: any;
  @Input() politicas!: any;
  @Input() certificaciones!: any;
  @Output() sendIdNoticia = new EventEmitter(); 
  idSeleccionada!: number;
  activeSlideIndex: number = 1;
  slidesPerView!: number;
  slidesPerViewCertificaciones!: number;
  slidesPerViewNovedades!: number;
  screenWidth!: number;
  router = inject(Router)

  ngOnInit(): void {
    this.getScreenWidth();
  }
  
  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1300) {
      this.slidesPerViewCertificaciones = 1
    }
    if (this.screenWidth > 1380) {
      this.slidesPerViewNovedades = 3
    }
    if (this.screenWidth <= 1380) {
      this.slidesPerViewNovedades = 2
    }
    if (this.screenWidth > 1300) {
      this.slidesPerViewCertificaciones = 3
    }
    if (this.screenWidth <= 1080) {
      this.slidesPerView = 1
    }
    if (this.screenWidth > 1080) {
      this.slidesPerView = 3
    }
    if (this.screenWidth < 620) {
      this.slidesPerViewNovedades = 1
    }
  }

  goToCertificacion(certificacion: any) {
    const data = certificacion;
    const url = this.router.serializeUrl(this.router.createUrlTree(['certificaciones', { c: btoa(JSON.stringify(data)) }]));
    window.open(`${url}`, '_self');
  }

  enviarId(id: number) {
    this.idSeleccionada = id;
    this.sendIdNoticia.emit(id)
  }

}
