import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { BoxReflectComponent } from '../../components/box-reflect/box-reflect.component';

@Component({
  selector: 'app-dvl-iot',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent,
    BoxReflectComponent
  ],
  templateUrl: './dvl-iot.component.html',
  styleUrl: './dvl-iot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlIotComponent {
  
  servicios = [
    {
      icon: 'assets/imgs/iot-icons/rentabilidad.svg',
      title: 'Incrementar rentabilidad'
    },
    {
      icon: 'assets/imgs/iot-icons/sustentabilidad.svg',
      title: 'Mejora la sustentabilidad'
    },
    {
      icon: 'assets/imgs/iot-icons/rendimiento.svg',
      title: 'Aumentar rendimiento'
    },
    {
      icon: 'assets/imgs/iot-icons/flota.svg',
      title: 'Controla la flota'
    }
  ]
  
}
