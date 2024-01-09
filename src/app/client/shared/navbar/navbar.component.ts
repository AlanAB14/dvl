import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuItems = [
    {
      path: 'nosotros',
      title: 'Nosotros'
    },
    {
      path: 'dvl-iot',
      title: 'DVL IoT'
    },
    {
      path: 'dvl-satelital',
      title: 'DVL Satelital'
    },
    {
      path: 'novedades',
      title: 'Novedades'
    },
    {
      path: 'contacto',
      title: 'Contacto'
    }
  ]
}
