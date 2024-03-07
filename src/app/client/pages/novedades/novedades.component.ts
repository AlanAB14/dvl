import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    TouchSliderComponent
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NovedadesComponent {
  info = [
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 1
    },
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 2
    },
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 3
    },
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 4
    },
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 5
    },
    {
      img: 'assets/imgs/novedades/noticias/noticia.png',
      id: 6
    }
  ]

  setIdNoticia(id: number) {
    console.log(id)
  }
}
