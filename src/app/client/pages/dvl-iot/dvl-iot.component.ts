import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';
import { BoxModuleComponent } from '../../components/box-module/box-module.component';
import { BoxExitoComponent } from '../../components/box-exito/box-exito.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { register } from 'swiper/element/bundle';
import { casosExitoIOT } from '../../../../assets/data/casos-exito';
import { DomSanitizer } from '@angular/platform-browser';
register();

@Component({
  selector: 'app-dvl-iot',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    BoxReflectComponent,
    BoxModuleComponent,
    BoxExitoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dvl-iot.component.html',
  styleUrl: './dvl-iot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlIotComponent implements OnInit, AfterViewInit {
  idServicioSeleccionado!: number;
  screenWidth!: number;
  slidesPerView!: number;
  animateText: boolean = false;
  cdr = inject(ChangeDetectorRef);
  casosExito = casosExitoIOT;
  sanitizerService = inject(DomSanitizer);

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    const boxModules = document.querySelectorAll(".box-module");
    if (isPlatformBrowser(this.platformId)) {
      boxModules.forEach(boxModule => {
        gsap.to(boxModule, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: boxModule,
            start: "top 80%", // Comienza la animación cuando el 80% superior del elemento es visible
            end: "bottom 40%", // Termina la animación cuando el 20% inferior del elemento es visible
            // scrub: true, // Hace que la animación se sincronice con el desplazamiento
          }
        });
      });
    }
  }


  servicios = [
    {
      icon: 'assets/imgs/iot-icons/rentabilidad.svg',
      title: 'Incrementar rentabilidad',
      //text: this.sanitizerService.bypassSecurityTrustHtml('Ofrecemos servicios llave en mano utilizando tecnología IoT (Internet de las cosas). Colocando un equipo <a style="color: blue!important" href="/iot-core">IoT Core</a>, desarrollado por nuestra empresa, que permite capturar información de cualquier sensor o equipo que forme parte del proceso productivo del cliente, permitiendo optimizar procesos y funcionamiento de maquinaria. De esta manera el cliente podrá ver en tiempo real las mediciones remotas, consultar estadísticas de períodos anteriores, o configurar alarmas por desvíos en las variables medidas a través de la web o de la aplicación para móviles (APP).'),
      text: 'Gracias a nuestro equipo comercial, en conjunto con los departamentos internos de Ingeniería de hardware y desarrollo de software, podemos ayudar a todo tipo de industria, municipio o cliente particular a incrementar la rentabilidad gracias al control y medición de procesos, minimizando pérdidas, roturas de equipos, paradas de planta, y todo tipo de costos ocultos por ineficiencia propias de la falta de medición.',
      id: 1
    },
    {
      icon: 'assets/imgs/iot-icons/sustentabilidad.svg',
      title: 'Mejorar la sustentabilidad',
      text: 'El control de uso de equipos o motores, así como la gestión correcta del consumo de agua y de energía eléctrica, favorecen tanto al cliente como a todo nuestro medioambiente.',
      id: 2
    },
    {
      icon: 'assets/imgs/iot-icons/rendimiento.svg',
      title: 'Aumentar rendimiento',
      text: 'Teniendo información instantánea e histórica de horarios de funcionamiento de equipos y sus consumos, el cliente podrá aumentar el rendimiento de su empresa, maximizando el correcto uso del equipamiento, en base a información para la toma de decisiones.',
      id: 3
    },
    {
      icon: 'assets/imgs/iot-icons/flota.svg',
      title: 'Control de procesos',
      text: 'La información capturada en diversos puntos críticos de cada proceso le permite al cliente contar con la información necesaria y suficiente para tener control sobre el mismo, permitiendo minimizar desvíos, garantizando la continuidad del negocio, optimizando costos y mejorando la eficiencia.  ',
      id: 4
    }
  ]

  modulos = [
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_cadena_frio.svg',
      title: 'Control de cadenas de frío',
      text: 'Consiste en la medición y control continuo de cadenas de fríos. Permite general alarmas en función de valores mínimos y máximos predeterminados.',
      pdf: 'assets/data/btn-control-cadena-de-frio.pdf'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_caudales.svg',
      title: 'Medición de Niveles y Caudales',
      text: 'Consiste en la medición on-line de los recursos y reservorios hídricos, así como también los sistemas de bombeo, caudales en circuitos primarios y de distribución. Con esta ecnología se pueden tener históricos, así como también el conocimiento en tiempo real, detectando anomalías en forma temprana.',
      pdf: 'assets/data/btn-medicion-de-niveles-caudales.pdf'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_medicion.svg',
      title: 'Medición de Niveles en silos',
      text: 'Consiste en la medición on-line del nivel de contenido dentro de un silo, así sea harina, cereal, o alimento balanceado.',
      pdf: 'assets/data/btn-medicion-de-niveles-de-silos.pdf'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_combustible.svg',
      title: 'Gestión de Despacho de Combustible',
      text: 'Consiste en medir la cantidad de litros de combustible que son despachados por el sistema sólo a usuarios habilitados e identificados con un llavero o tarjeta específica. El sistema cuenta con GPS, por lo que genera informes que permiten saber quién cargó, a qué hora, en qué lugar, cuántos litros fueron suministrados, y de qué tanque en cuestión.',
      pdf: 'assets/data/btn-gestion-de-despacho-de-combustible.pdf'
    },
    // {
    //   icon: 'assets/imgs/modulos-agroindustria/ic_personal.svg',
    //   title: 'Gestión de Personal',
    //   text: 'Permite la identificación del personal mediante credenciales de proximidad. Es un método rápido, cómodo y eficiente, que complementa la seguridad con la facilidad de uso.'
    // },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_tableros.svg',
      title: 'Medición Remota de Tableros',
      text: 'Permite transmitir y monitorear las distintas señales que son capturadas desde un tablero eléctrico o de comandos, de esta manera se puede consultar remotamente el estado del mismo, y tener histórico de las distintas variables y mediciones en cuestión. Admite generar alarmas remotas y en el propio sitio mediante señales lumínicas y sonoras.',
      pdf: 'assets/data/btn-medicion-remota-de-tableros.pdf'

    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_sensores.svg',
      title: 'Integración de Sensores Industriales',
      text: 'Propone transmitir remotamente la medición realizada por sensor, generando también un histórico del mismo. Permite general alarmas digitales y por SMS en función de valores mínimos y máximos predeterminados.',
      pdf: 'assets/data/btn-integracion-de-sensores-industriales.pdf'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_electrico.svg',
      title: 'Gestión de Consumo Eléctrico',
      text: 'Permite medir de forma remota el consumo eléctrico de instalaciones de baja y media tensión.',
      pdf: 'assets/data/btn-gestion-de-consumo-electrico.pdf'
    },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_remoto_maquinarias.svg',
      title: 'Control Remoto de maquinarias',
      text: 'Permite optimizar el tiempo de acceso a maquinaria que se encuentra en lugares remotos, o que está distribuida de manera inconveniente para su gestión en forma personal, o simplemente que se hace más eficiente e inmediato el operarlo en forma remota.',
      pdf: 'assets/data/btn-control-remoto-de-maquinarias.pdf'
    },
    // {
    //   icon: 'assets/imgs/modulos-agroindustria/ic_flotas.svg',
    //   title: 'Gestión de flotas',
    //   text: 'Permite disponer de toda la información necesaria sobre la flota para llevar a cabo un seguimiento de cada vehículo, en todo momento a través de nuestra plataforma web. Posibilita el ahorro de costos y ser más eficiente en cuanto a la gestión de la movilidad en el negocio.'
    // },
    // {
    //   icon: 'assets/imgs/modulos-agroindustria/ic_senal_celular.svg',
    //   title: 'Medición de calidad de señal celular',
    //   text: 'Se trata de un sistema de medición de parámetros de red específicos, que son evaluados por las áreas técnicas de las operadoras de telefonía celular, permitiendo conocer el funcionamiento de la red, así como también la cobertura y capacidad en el sitio medido.'
    // },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_laboreo.svg',
      title: 'Gestión de laboreo',
      text: 'Consiste en la medición de parámetros de operación del trabajo en campo sobre maquinaria agrícola o pesada.',
      pdf: 'assets/data/btn-gestion-de-laboreo.pdf'
    },
    // {
    //   icon: 'assets/imgs/modulos-agroindustria/ic_aire.svg',
    //   title: 'Medición de calidad de aire',
    //   text: 'Consiste en la medición en campo, y el envío a plataforma de datos relacionados con calidad de aire, concentración de gases, partículas en suspensión, etc.'
    // },
    {
      icon: 'assets/imgs/modulos-agroindustria/ic_soluciones.svg',
      title: 'I + D Soluciones a Medida:',
      text: 'Investigación y desarrollo para una mayor versatilidad y adaptación a lo requerido, gestionando los recursos disponibles.',
      pdf: 'assets/data/btn-soluciones-a-medida.pdf'
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
