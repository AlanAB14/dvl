import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [
    CommonModule,
    TouchSliderComponent
  ],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NosotrosComponent implements OnInit{
  empleados: number = 100;
  currentNumberEmpleados: number = 0;
  estructura: number = 6500;
  currentNumberEstructura: number = Math.floor(this.estructura / 1.02);
  anios: number = 25;
  currentNumberAnios: number = 0;
  incrementSpeed: number = 10;
  isNumberVisible: boolean = false;
  
  data: string[] = [
    'PRIORIZAR la capacitación permanente para asegurar las competencias del personal en los diferentes niveles de la organización y generar un ambiente de trabajo motivador, brindando el apoyo y los recursos necesarios para garantizar la mejora continua.',
    'ADAPTARSE a las nuevas demandas, focalizando permanentemente en la innovación de la tecnología y los procesos, mediante una organización flexible que sea capaz de dar respuesta a las necesidades de los clientes, actuales y potenciales.',
    'PROVEER bienes y servicios que constantemente satisfagan los requerimientos de los clientes, el capital humano y la dirección estratégica de la empresa.',
    'ADOPTAR una estrategia de estandarización de los procesos para mejorar la eficiencia y obtener los mejores costos, estableciendo metas y objetivos específicos.',
    'TRABAJAR en conjunto con nuestros proveedores para alcanzar su compromiso con la calidad, y así poder garantizarla a nuestros clientes.',
    'CONTRIBUIR de manera activa y responsable con el desarrollo sustentable.'
  ]
  dataCertificaciones: any[] = [
    {
      id: 1,
      title: 'Certificación Cesvi',
      date: '10 December 2020',
      img: 'assets/imgs/certificaciones/cesvi.png',
      text: 'Informacion del certificado'
    },
    {
      id: 2,
      title: 'Certificación ISO 9001',
      date: '10 December 2020',
      img: 'assets/imgs/certificaciones/iso.png',
      text: 'Informacion del certificado'
    },
    {
      id: 3,
      title: 'Políticas de Calidad – Documentación ISO 9001:2015',
      date: '10 December 2020',
      img: 'assets/imgs/certificaciones/no-img.png',
      text: 'Informacion del certificado'
    },
    {
      id: 4,
      title: 'Políticas de Calidad – Ej ISO 9001:2015',
      date: '10 December 2020',
      img: 'assets/imgs/certificaciones/no-img.png',
      text: 'Informacion del certificado'
    },
    {
      id: 5,
      title: 'Políticas de Calidad – Ej2 ISO 9001:2015',
      date: '10 December 2020',
      img: 'assets/imgs/certificaciones/no-img.png',
      text: 'Informacion del certificado'
    },
  ];
  @ViewChild('numbers', { static: true }) elementRef!: ElementRef;
  constructor( private cdf: ChangeDetectorRef ) {}
  ngOnInit(): void {
    this.checkIfNumberVisible();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.checkIfNumberVisible();
  }

  checkIfNumberVisible() {
    const windowHeight = window.innerHeight;
    const elementOffset = this.elementRef.nativeElement.getBoundingClientRect().top;

    // Si el elemento está dentro de la vista
    if (elementOffset < windowHeight && !this.isNumberVisible) {
      this.isNumberVisible = true;
      this.increaseNumber();
    }
  }
  
  increaseNumber() {
    const timerEmpleados = setInterval(() => {
      this.currentNumberEmpleados++;
      if (this.currentNumberEmpleados >= this.empleados) {
        clearInterval(timerEmpleados);
      }
      this.cdf.detectChanges();
    }, 10);

    const timerEstructura = setInterval(() => {
      this.currentNumberEstructura++;
      if (this.currentNumberEstructura >= this.estructura) {
        clearInterval(timerEstructura);
      }
      this.cdf.detectChanges();
    }, 10);

    const timerAnio = setInterval(() => {
      this.currentNumberAnios++;
      if (this.currentNumberAnios >= this.anios) {
        clearInterval(timerAnio);
      }
      this.cdf.detectChanges();
    }, 50);
  }
}
