import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject, signal } from '@angular/core';
import { TouchSliderComponent } from '../../components/touch-slider/touch-slider.component';
import { NumbersUsService } from '../../../services/numbers-us.service';
import { LoaderService } from '../../../services/loader.service';
import { CountUpModule } from 'ngx-countup';
import { PoliciesService } from '../../../services/policies.service';
import { CertificationsService } from '../../../services/certifications.service';
import { NosotrosService } from '../../../services/nosotros.service';

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
    this.getNosotros();
    this.getNumbers();
    this.getPolicies();
    this.getCertifications()
  }

  getNosotros() {
    this.loaderService.setLoader(true);
    this.nosotrosService.getInfoUs()
      .subscribe((nosotros: any) => {
        this.nosotros.set(nosotros[0]);
        this.loaderService.setLoader(false);
      }, (error) => {
        console.log('Error al traer Nosotros', error)
        this.loaderService.setLoader(false);
      })
  }

  getPolicies() {
    this.loaderService.setLoader(true);
    this.policiesService.getPolicies()
      .subscribe((policies: any) => {
        this.politicas.set(policies);
        this.loaderService.setLoader(false);
      }, (error) => {
        console.log('Error al traer Politicas', error)
        this.loaderService.setLoader(false);
      })
  }

  getNumbers() {
    this.loaderService.setLoader(true);
    this.numbersUsService.getNumbers()
      .subscribe((numbers: any) => {
        const estructuraObj = numbers.filter((number: any) => number.type === "estructura")
        const empleadosObj = numbers.filter((number: any) => number.type === "empleados")
        const aniosObj = numbers.filter((number: any) => number.type === "anios")
        this.estructura = estructuraObj[0].number;
        this.empleados = empleadosObj[0].number;
        this.anios = aniosObj[0].number;
        this.cdf.detectChanges();
        this.loaderService.setLoader(false);
      },(error) => {
        console.log('Error al traer numbersUs', error);
        this.loaderService.setLoader(false);
      })
  }

  getCertifications() {
    this.loaderService.setLoader(true);
    this.certificationService.getCertifications()
      .subscribe((cert: any) => {
        this.certificaciones.set(cert);
        this.loaderService.setLoader(false);
      }, (error) => {
        console.log('Error al traer Certificaciones', error)
        this.loaderService.setLoader(false);
      })
  }
  
}
