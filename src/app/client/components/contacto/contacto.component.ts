import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent { }
