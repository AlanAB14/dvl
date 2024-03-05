import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';

@Component({
  selector: 'app-dvl-satelital',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    BoxReflectComponent
  ],
  templateUrl: './dvl-satelital.component.html',
  styleUrl: './dvl-satelital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlSatelitalComponent {
  idServicioSeleccionado!: number;
  screenWidth!: number;
  slidesPerView!: number;
  animateText: boolean = false;
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
  ]

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
