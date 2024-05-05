import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
  esRutaEspecifica: boolean = false;
  esRutaEspecificaSatelital: boolean = false;
  isExpanded: boolean = false;

  menuItems = [
    {
      path: 'nosotros',
      title: 'Nosotros'
    },
    {
      path: 'iot',
      title: 'IOT'
    },
    {
      path: 'monitoreo-flota',
      title: 'Monitoreo de flota'
    },
    {
      path: 'novedades',
      title: 'Novedades'
    },
    {
      path: 'contacto',
      title: 'Contacto'
    }
  ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.esRutaEspecifica = event.url === '/iot';
      this.esRutaEspecificaSatelital = event.url === '/monitoreo-flota';
    });
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
