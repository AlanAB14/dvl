import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { InfiniteSlideComponent } from '../../components/infinite-slide/infinite-slide.component';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TouchSliderComponent,
    ContactoComponent,
    InfiniteSlideComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  loaderService = inject(LoaderService)
  images = [
    {
      imgSrc: 'assets/videos/video-dvl-iot.mp4',
      imgPre: 'assets/videos/dvl-iot-pre.png',
      imgAlt: 'image 1'
    },
    {
      imgSrc: 'assets/videos/video-dvl-flota.mp4',
      imgPre: 'assets/videos/dvl-sat-pre.png',
      imgAlt: 'image 1'
    }
  ]

  imagesClientes = [
    {
      imgSrc: 'assets/imgs/clientes/aapresid.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/adeco-agro.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/advanta.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/bayer.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/cooperacion-seguros.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/corven.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/cotreco.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/desab.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/friar.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/hook.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/melincue.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/monsanto.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/municipio-venado.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/nestle.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/pedroperez.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/promivi.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/rda.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/transnatali.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/vasalli.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/venturino.jpg',
      imgAlt: 'img 1'
    }
  ]

  ngOnInit(): void {
    this.loaderService.setLoader(true)
    setTimeout(() => {
      this.loaderService.setLoader(false);
    }, 500);
  }
}
