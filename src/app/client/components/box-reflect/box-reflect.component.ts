import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';

@Component({
  selector: 'app-box-reflect',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="box" [ngClass]="{'selected': estaSeleccionado}">
      <div class="box-icon">
        <img [src]="icon" [style.padding]="icon === 'assets/imgs/iot-icons/sustentabilidad.svg' ? '3px' : '0'" alt="">
      </div>
      <div class="box-title">
        <p>
          {{ title }}
        </p>
      </div>
      <div class="reflect"></div>
    </div>
  `
  ,
  styleUrl: './box-reflect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxReflectComponent implements OnInit, OnChanges {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() id!: number;
  @Input() servicioSeleccionado!: number;
  @Output() enviarId = new EventEmitter<number>();
  estaSeleccionado!: boolean;

  ngOnInit(): void {
    this.verificaSeleccion()
  }

  verificaSeleccion() {
    if (this.id === this.servicioSeleccionado) {
      this.estaSeleccionado = true;
    }else {
      this.estaSeleccionado = false
    }
  }

  ngOnChanges(changes: any) {
    console.log(changes)
    this.verificaSeleccion()
  }
}
