import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    @if (!cargando) {
      <p>certificaciones works!</p>
    }@else  {
      <div class="loader-dvl-box">
        <div class="loader-dvl"></div>
      </div>
    }
    `,
  styleUrl: './certificaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CertificacionesComponent {
  certificacion!: any;
  cargando!: boolean;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.cargando = true;
    console.log(this.certificacion)
    const data = atob(this.route.snapshot.paramMap.get('c')!)
    try {
      this.certificacion = JSON.parse(data)
      console.log(this.certificacion)
      this.cargando = false;
    } catch (error) {
      this.cargando = false;
      this.router.navigate(['/'])
    }
  };
}