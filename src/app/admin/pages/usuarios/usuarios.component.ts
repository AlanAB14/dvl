import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>usuarios works!</p>`,
  styleUrl: './usuarios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosComponent { }
