import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  esRutaEspecifica: boolean = false;
  esRutaEspecificaSatelital: boolean = false;

  
  constructor(private router: Router,
              private cdf: ChangeDetectorRef) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.esRutaEspecifica = event.url === '/iot';
      this.esRutaEspecificaSatelital = event.url === '/monitoreo-flota';
      cdf.detectChanges()
    });
  }
}
