import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';
import { BoxModuleComponent } from '../../components/box-module/box-module.component';
import { BoxExitoComponent } from '../../components/box-exito/box-exito.component';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-dvl-iot',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    BoxReflectComponent,
    BoxModuleComponent,
    BoxExitoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dvl-iot.component.html',
  styleUrl: './dvl-iot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlIotComponent implements OnInit{
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
      icon: 'assets/imgs/iot-icons/rentabilidad.svg',
      title: 'Incrementar rentabilidad',
      text: 'Ofrecemos servicios llave en mano utilizando tecnología IoT (Internet de las cosas). Colocando un equipo IoT Core, desarrollado por nuestra empresa, que permite capturar información de cualquier sensor o equipo que forme parte del proceso productivo del cliente, permitiendo optimizar procesos y funcionamiento de maquinaria. De esta manera el cliente podrá ver en tiempo real las mediciones remotas, consultar estadísticas de períodos anteriores, o configurar alarmas por desvíos en las variables medidas a través de la web o de la aplicación para móviles (APP).',
      id: 1
    },
    {
      icon: 'assets/imgs/iot-icons/sustentabilidad.svg',
      title: 'Mejora la sustentabilidad',
      text: 'Prueba',
      id: 2
    },
    {
      icon: 'assets/imgs/iot-icons/rendimiento.svg',
      title: 'Aumentar rendimiento',
      text: 'Prueba',
      id: 3
    },
    {
      icon: 'assets/imgs/iot-icons/flota.svg',
      title: 'Controla la flota',
      text: 'Prueba',
      id: 4
    }
  ]

  modulos = [
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_cadena_frio.svg',
      title: 'Control de cadenas de frío',
      text: 'Consiste en la medición y control continuo de cadenas de fríos. Permite general alarmas en función de valores mínimos y máximos predeterminados.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_caudales.svg',
      title: 'Medición de Niveles y Caudales',
      text: 'Consiste en la medición on-line de los recursos y reservorios hídricos, así como también los sistemas de bombeo, caudales en circuitos primarios y de distribución. Con esta ecnología se pueden tener históricos, así como también el conocimiento en tiempo real, detectando anomalías en forma temprana.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_medicion.svg',
      title: 'Medición de Niveles en silos',
      text: 'Consiste en la medición on-line del nivel de contenido dentro de un silo, así sea harina, cereal, o alimento balanceado.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_combustible.svg',
      title: 'Gestión de Despacho de Combustible',
      text: 'Consiste en medir la cantidad de litros de combustible que son despachados por el sistema sólo a usuarios habilitados e identificados con un llavero o tarjeta específica. El sistema cuenta con GPS, por lo que genera informes que permiten saber quién cargó, a qué hora, en qué lugar, cuántos litros fueron suministrados, y de qué tanque en cuestión.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_personal.svg',
      title: 'Gestión de Personal',
      text: 'Permite la identificación del personal mediante credenciales de proximidad. Es un método rápido, cómodo y eficiente, que complementa la seguridad con la facilidad de uso.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_tableros.svg',
      title: 'Medición Remota de Tableros',
      text: 'Permite transmitir y monitorear las distintas señales que son capturadas desde un tablero eléctrico o de comandos, de esta manera se puede consultar remotamente el estado del mismo, y tener histórico de las distintas variables y mediciones en cuestión. Admite generar alarmas remotas y en el propio sitio mediante señales lumínicas y sonoras.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_sensores.svg',
      title: 'Integración de Sensores Industriales',
      text: 'Propone transmitir remotamente la medición realizada por sensor, generando también un histórico del mismo. Permite general alarmas digitales y por SMS en función de valores mínimos y máximos predeterminados.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_electrico.svg',
      title: 'Gestión de Consumo Eléctrico',
      text: 'Permite medir de forma remota el consumo eléctrico de instalaciones de baja y media tensión.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_remoto_maquinarias.svg',
      title: 'Control Remoto de maquinarias',
      text: 'Permite optimizar el tiempo de acceso a maquinaria que se encuentra en lugares remotos, o que está distribuida de manera inconveniente para su gestión en forma personal, o simplemente que se hace más eficiente e inmediato el operarlo en forma remota.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_flotas.svg',
      title: 'Gestión de flotas',
      text: 'Permite disponer de toda la información necesaria sobre la flota para llevar a cabo un seguimiento de cada vehículo, en todo momento a través de nuestra plataforma web. Posibilita el ahorro de costos y ser más eficiente en cuanto a la gestión de la movilidad en el negocio.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_senal_celular.svg',
      title: 'Medición de calidad de señal celular',
      text: 'Se trata de un sistema de medición de parámetros de red específicos, que son evaluados por las áreas técnicas de las operadoras de telefonía celular, permitiendo conocer el funcionamiento de la red, así como también la cobertura y capacidad en el sitio medido.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_laboreo.svg',
      title: 'Gestión de laboreo',
      text: 'Consiste en la medición de parámetros de operación del trabajo en campo sobre maquinaria agrícola o pesada.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_aire.svg',
      title: 'Medición de calidad de aire',
      text: 'Consiste en la medición en campo, y el envío a plataforma de datos relacionados con calidad de aire, concentración de gases, partículas en suspensión, etc.'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_soluciones.svg',
      title: 'I + D Soluciones a Medida:',
      text: 'Investigación y desarrollo para una mayor versatilidad y adaptación a lo requerido, gestionando los recursos disponibles.'
    }
  ]

  recibirId(id: number) {
    this.idServicioSeleccionado = id;
  }

  getTextoIdSeleccionado() {
    const servicio = this.servicios.find(servicio => servicio.id === this.idServicioSeleccionado)
    return servicio?.text
  }

  seteoPrimerServicio() {
    this.recibirId(this.servicios[0].id)
  }

  setIdSeleccionado(id: number) {
    this.idServicioSeleccionado = id
    this.animateText = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.animateText = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
