import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';
import { BoxComentarioComponent } from '../../components/box-comentario/box-comentario.component';
import { NewsService } from '../../../services/news.service';
import { LoaderService } from '../../../services/loader.service';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    TouchSliderComponent,
    BoxComentarioComponent
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NovedadesComponent implements OnInit{
  newsService = inject(NewsService);
  commentsService = inject(CommentsService);
  loaderService = inject(LoaderService);
  noticiaSeleccionada!: any;
  news: any = signal(null);
  comments: any = signal(null);
  animateText: boolean = false;
  cdr = inject(ChangeDetectorRef);
  @ViewChild('noticia') noticia!: ElementRef;
  comentarios = [
    {
      img:'assets/imgs/gris.jpg',
      stars: 3,
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.',
      name: 'Pablo Lopez',
      profession: 'Agrónomo'
    },
    {
      img:'assets/imgs/gris.jpg',
      stars: 4,
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.',
      name: 'Sebastián Loeb',
      profession: 'Analista en Logística'
    },
    {
      img:'assets/imgs/gris.jpg',
      stars: 5,
      text: 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.',
      name: 'Jesica Andra',
      profession: 'Analista en Logísitica'
    }
  ]

  ngOnInit(): void {
    this.getNoticias();
    this.getComentarios();
  }

  getComentarios() {
    this.loaderService.setLoader(true);
    this.commentsService.getComments()
      .subscribe((comments: any) => {
        console.log(comments)
        this.comments.set(comments);
        this.loaderService.setLoader(false);
      }, (error) => {
        console.log('Error en getComments', error)
        this.loaderService.setLoader(false);
      })
  }

  getNoticias() {
    this.loaderService.setLoader(true);
    this.newsService.getNews()
      .subscribe((news: any) => {
        this.news.set(news);
        this.loaderService.setLoader(false);
      }, (error) => {
        console.log('Error en getNoticias', error)
        this.loaderService.setLoader(false);
      })
  }

  

  setIdNoticia(id: number) {
    const noticia = this.news().find((noticia: any) => noticia.id === id)
    this.noticiaSeleccionada = noticia;
    this.animateText = true;
    console.log(this.noticiaSeleccionada)
    this.cdr.detectChanges();

    setTimeout(() => {
      this.animateText = false;
      this.cdr.detectChanges();
    }, 500);
    console.log(this.noticia)
    this.noticia.nativeElement.scrollIntoView({ behavior: "smooth" })
  }
}
