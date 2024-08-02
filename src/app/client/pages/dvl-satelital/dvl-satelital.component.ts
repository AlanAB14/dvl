import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';
import { BoxModuleComponent } from '../../components/box-module/box-module.component';
import { casosExito } from '../../../../assets/data/casos-exito'

import { register } from 'swiper/element/bundle';
import { BoxExitoComponent } from '../../components/box-exito/box-exito.component';
register();

@Component({
  selector: 'app-dvl-satelital',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    BoxReflectComponent,
    BoxModuleComponent,
    BoxExitoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dvl-satelital.component.html',
  styleUrl: './dvl-satelital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlSatelitalComponent implements OnInit{
  idServicioSeleccionado!: number;
  screenWidth!: number;
  slidesPerView!: number;
  animateText: boolean = false;
  casosExito = casosExito

  cdr = inject(ChangeDetectorRef)

  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 1000) {
      this.slidesPerView = 1
    }
    if (this.screenWidth > 1000) {
      this.slidesPerView = 2
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 1000) {
      this.slidesPerView = 1
    }
    if (this.screenWidth > 1000) {
      this.slidesPerView = 2
    }

    this.seteoPrimerServicio()
  }

  confian = [
    { src: "assets/imgs/confian/confian-1.png", alt: "img-1" },
    { src: "assets/imgs/confian/confian-2.png", alt: "img-2" },
    { src: "assets/imgs/confian/confian-3.png", alt: "img-3" },
    { src: "assets/imgs/confian/confian-4.png", alt: "img-4" },
    { src: "assets/imgs/confian/confian-5.png", alt: "img-5" },
    { src: "assets/imgs/confian/confian-6.png", alt: "img-6" },
    { src: "assets/imgs/confian/confian-7.png", alt: "img-7" },
    { src: "assets/imgs/confian/confian-8.png", alt: "img-8" },
    { src: "assets/imgs/confian/confian-9.png", alt: "img-9" },
    { src: "assets/imgs/confian/confian-10.png", alt: "img-10" },
    { src: "assets/imgs/confian/confian-11.png", alt: "img-11" },
    { src: "assets/imgs/confian/confian-12.png", alt: "img-12" },
    { src: "assets/imgs/confian/confian-13.png", alt: "img-13" },
  ];


  servicios = [
    {
      icon: 'assets/imgs/satelital-icons/ic_control-flota.svg',
      title: 'Controlar la Flota',
      text: 'Estableciendo un programa de mantenimiento preventivo para cada vehículo. Uso de informes y análisis de costos para tomar decisiones informadas. Implementación de políticas de seguridad vial y programas de entrenamiento para conductores. Uso de tecnologías de asistencias al conductor y alertas de seguridad. Paneles de control para evaluar el rendimiento y la eficiencia de la flota.',
      id: 1
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_aumento-rendimiento.svg',
      title: 'Aumentar Rendimiento',
      text: 'Monitoreo del consumo de combustible para identificar áreas de mejora. Casos de Éxito 20% de ahorro. Reducción de kilómetros recorridos mediante la planificación eficiente. Seguimiento de la vida útil de los neumáticos y reemplazo oportuno. Casos de Éxito 30% de ahorro. Creación del perfil de conducción, relacionando comportamiento en velocidades, frenadas bruscas y ralentí de motor.',
      id: 2
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_aumento-rendimiento.svg',
      title: 'Incrementar Rentabilidad',
      text: '- Análisis regular de las rutas para identificar oportunidades de mejora y reducción de kilómetros recorridos. <br> - Uso de datos para identificar áreas de mejora en la eficiencia de combustible y reducción de emisiones. <br> - Uso de incentivos para motivar a los conductores a mantener un buen desempeño y respetar las políticas de eficiencia.',
      id: 3
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_beneficios.svg',
      title: 'Servicio Colaborativo',
      text: 'Webservices, integraciones y nuevas herramientas para generar reportes diferenciales logrando que el dato se convierta en información. Capacitaciones al personal de logística y a los choferes. Gestión de flotas.',
      id: 4
    }
  ];

  herramientas = [
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_control.svg',
      title: 'Tablero de Control',
      text: 'Convirtiendo el dato en información',
      id: 1
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_mantenimiento.svg',
      title: 'Módulo mantenimientos y costos',
      text: 'Asistente técnico contable',
      id: 2
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_choferes.svg',
      title: 'Módulo Choferes',
      text: 'Informe de conducción y estadísticas',
      id: 3
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_rutas.svg',
      title: 'Hoja de rutas',
      text: 'Planificación eficiente',
      id: 4
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_flota.svg',
      title: 'Flota',
      text: '',
      id: 5
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_vehiculos.svg',
      title: 'Vehículos',
      text: '',
      id: 6
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_zonas.svg',
      title: 'Zonas (Geocercas)',
      text: '',
      id: 7
    },
    {
      icon: 'assets/imgs/satelital-icons/herramientas/ic_eventos.svg',
      title: 'Eventos y alarmas',
      text: '',
      id: 8
    }
  ]

  

  seteoPrimerServicio() {
    this.recibirId(this.servicios[0].id)
  }

  recibirId(id: number) {
    this.idServicioSeleccionado = id;
  }

  getTextoIdSeleccionado() {
    const servicio = this.servicios.find(servicio => servicio.id === this.idServicioSeleccionado)
    return servicio?.text
  }

  setIdSeleccionado(id: number, element: HTMLElement) {
    this.idServicioSeleccionado = id
    this.animateText = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.animateText = false;
      this.cdr.detectChanges();
    }, 500);

    if (this.screenWidth < 450) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
}
