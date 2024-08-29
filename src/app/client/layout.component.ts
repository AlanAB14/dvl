import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent implements OnInit {
  esRutaEspecifica: boolean = false;
  cargando: any = signal(false);
  loaderService = inject(LoaderService);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.esRutaEspecifica = event.url === '/iot' || event.url === '/monitoreo-flota';
    });
  }

  ngOnInit(): void {
    this.loaderService.loader$.subscribe(value => {
      this.cargando.set(value);
    })
  }

  openWhatsapp() {
    const number = environment.phoneNumber;
    const message = 'Tengo una consulta desde la web';
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
}
