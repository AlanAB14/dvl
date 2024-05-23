import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';
import { NumbersUsService } from '../../../services/numbers-us.service';
import { LoaderService } from '../../../services/loader.service';
import { CountUpModule } from 'ngx-countup';
import { PoliciesService } from '../../../services/policies.service';
import { CertificationsService } from '../../../services/certifications.service';
import { NosotrosService } from '../../../services/nosotros.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [
    CommonModule,
    TouchSliderComponent,
    CountUpModule
  ],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NosotrosComponent implements OnInit {
  numbersUsService = inject(NumbersUsService);
  nosotrosService = inject(NosotrosService);
  policiesService = inject(PoliciesService);
  certificationService = inject(CertificationsService);
  loaderService = inject(LoaderService);
  empleados!: number;
  estructura!: number;
  anios!: number;
  politicas = signal(null);
  certificaciones = signal(null);
  nosotros: any = signal(null);

  @ViewChild('numbers', { static: true }) elementRef!: ElementRef;
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Mostrar el loader antes de iniciar las solicitudes
    this.loaderService.setLoader(true);

    // Crear observables para cada una de las solicitudes
    const nosotros$ = this.nosotrosService.getInfoUs();
    const numbers$ = this.numbersUsService.getNumbers();
    const policies$ = this.policiesService.getPolicies();
    const certifications$ = this.certificationService.getCertifications();

    // Utilizar forkJoin para ejecutar todas las solicitudes en paralelo
    forkJoin([nosotros$, numbers$, policies$, certifications$]).subscribe(
      ([nosotros, numbers, policies, certifications]: any) => {

        // Procesar datos de nosotros
        this.nosotros.set(nosotros[0]);

        // Procesar datos de numbers
        const estructuraObj = numbers.filter((number: any) => number.type === "estructura");
        const empleadosObj = numbers.filter((number: any) => number.type === "empleados");
        const aniosObj = numbers.filter((number: any) => number.type === "anios");
        this.estructura = estructuraObj[0].number;
        this.empleados = empleadosObj[0].number;
        this.anios = aniosObj[0].number;

        // Procesar datos de policies
        this.politicas.set(policies);

        // Procesar datos de certifications
        this.certificaciones.set(certifications);

        // Ocultar el loader después de completar todas las solicitudes
        this.loaderService.setLoader(false);
      },
      error => {
        // Manejar errores de cualquier solicitud
        console.log('Error en una de las solicitudes', error);

        // Ocultar el loader en caso de error
        this.loaderService.setLoader(false);
      }
    );
  }
}
