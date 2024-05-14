import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-iot-core',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="iot-core-section">
  @if (cargando() !== null) {
    <!-- <pdf-viewer [src]="'assets/data/IOT-CORE.pdf'"
                [render-text]="true"
                [original-size]="false"
                style="width: 100%; min-height: 100vh"
    ></pdf-viewer> -->
    <iframe style="width: 100%; min-height: 100vh" src="assets/data/IOT-CORE.pdf"></iframe>
  }
  </div>
  
  `,
  styleUrl: './iot-core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IotCoreComponent implements OnInit{
  cargando: any = signal(null)
  ngOnInit(): void {
    this.muestroPdf()
  }

  muestroPdf() {
    setTimeout(() => {
      this.cargando.set(true)
    }, 3000);
  }
  
  
}
