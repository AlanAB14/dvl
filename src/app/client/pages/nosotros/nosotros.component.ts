import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';
import { NumbersUsService } from '../../../services/numbers-us.service';
import { LoaderService } from '../../../services/loader.service';
import { CountUpModule } from 'ngx-countup';
import { PoliciesService } from '../../../services/policies.service';
import { CertificationsService } from '../../../services/certifications.service';
import { NosotrosService } from '../../../services/nosotros.service';
import { catchError, of, switchMap, tap } from 'rxjs';

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
export default class NosotrosComponent implements OnInit{
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
  constructor( private cdf: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.loadDataSequentially();
  }

  loadDataSequentially() {
    this.loaderService.setLoader(true);
    
    this.getNosotros()
      .pipe(
        switchMap(() => this.getCertifications()),
        switchMap(() => this.getNumbers()),
        switchMap(() => this.getPolicies()),
        catchError(error => {
          console.log('Error en la cadena de llamadas', error);
          this.loaderService.setLoader(false);
          return of(null);
        })
      )
      .subscribe(() => {
        this.loaderService.setLoader(false);
      });
  }

  getNosotros() {
    return this.nosotrosService.getInfoUs().pipe(
      tap((nosotros: any) => {
        this.nosotros.set(nosotros[0]);
      })
    );
  }

  getPolicies() {
    return this.policiesService.getPolicies().pipe(
      tap((policies: any) => {
        this.politicas.set(policies);
      })
    );
  }

  getNumbers() {
    return this.numbersUsService.getNumbers().pipe(
      tap((numbers: any) => {
        const estructuraObj = numbers.filter((number: any) => number.type === "estructura");
        const empleadosObj = numbers.filter((number: any) => number.type === "empleados");
        const aniosObj = numbers.filter((number: any) => number.type === "anios");
        this.estructura = estructuraObj[0].number;
        this.empleados = empleadosObj[0].number;
        this.anios = aniosObj[0].number;
        this.cdf.detectChanges();
      })
    );
  }

  getCertifications() {
    return this.certificationService.getCertifications().pipe(
      tap((cert: any) => {
        this.certificaciones.set(cert);
      })
    );
  }
  
}
