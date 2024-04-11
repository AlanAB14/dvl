import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';
import { BoxModuleComponent } from '../../components/box-module/box-module.component';

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
    BoxExitoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dvl-satelital.component.html',
  styleUrl: './dvl-satelital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlSatelitalComponent {
  idServicioSeleccionado!: number;
  screenWidth!: number;
  slidesPerView!: number;
  animateText: boolean = false;
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

  casosExito = [
    {
      img: 'assets/imgs/casos-exito/friar-logo.png',
      problematica: ['Conocer el estado operativo de sus estaciones de bombeo.', 'Obtener la huella hídrica por kilo de animal.'],
      solucion: ['Medición de Niveles y Caudales.'],
      resultados: ['Instalación de sensores en bombas.', 'Volvió más eficiente el sistema.', 'Se logró a través de la plataforma medir la huella hídrica por kilo de animal.']
    },
    {
      img: 'assets/imgs/casos-exito/geosistemas-logo.png',
      problematica: ['Proporcionar herramientas de gestión de plagas y enfermedades con el objetivo de optimizar el uso de pesticidas e incrementar la calidad de la cosecha.'],
      solucion: ['Integramos IoT Core de DVL al nuevo modelo de doble pulverizador con detectores de malezas, desarrollado por Geosistemas.'],
      resultados: ['Las métricas y mediciones de pulverización pueden visualizarse en forma remota, garantizando la captura de datos sin pérdidas.', 'Los datos recolectados en sitio son enviados mediante tecnología de transmisión de datos de última generación, permitiendo ser utilizados mediante cualquier computadora o celular, gracias a la plataforma WEB responsive, y la APP DVL para Android.']
    }
  ]
  servicios = [
    {
      icon: 'assets/imgs/satelital-icons/ic_control-flota.svg',
      title: 'Control de Flota',
      text: 'Ofrecemos servicios llave en mano utilizando tecnología IoT (Internet de las cosas). Colocando un equipo IoT Core, desarrollado por nuestra empresa, que permite capturar información de cualquier sensor o equipo que forme parte del proceso productivo del cliente, permitiendo optimizar procesos y funcionamiento de maquinaria. De esta manera el cliente podrá ver en tiempo real las mediciones remotas, consultar estadísticas de períodos anteriores, o configurar alarmas por desvíos en las variables medidas a través de la web o de la aplicación para móviles (APP).',
      id: 1
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_aumento-rendimiento.svg',
      title: 'Aumento de Rendimiento',
      text: 'Prueba',
      id: 2
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_aumento-rendimiento.svg',
      title: 'Incremento de Rentabilidad',
      text: 'Prueba',
      id: 3
    },
    {
      icon: 'assets/imgs/satelital-icons/ic_beneficios.svg',
      title: 'Beneficios de sumar nuestra solución',
      text: 'Prueba',
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
