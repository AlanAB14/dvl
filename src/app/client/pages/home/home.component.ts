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
      imgSrc: 'assets/imgs/clientes/aapresid.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/adeco-agro.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/advanta.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/agropecuarios.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/altamirano.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/bayer.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/bragadense.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/brayco.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/cigra.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/cooperacion-seguros.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/corven.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/cotreco.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/desab.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/elpra.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/elsurco.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/emi.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/friar.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/gear.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/losgrobo.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/hook.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/marchisone.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/ingesa.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/jerarquicos.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/municipio-venado.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/monsanto.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/nestle.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/pedroperez.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/promivi.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/rda.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/tomas.png',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/transnatali.jpg',
      imgAlt: 'img 1'
    },
    {
      imgSrc: 'assets/imgs/clientes/venturino.png',
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
