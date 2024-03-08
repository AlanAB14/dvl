import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactoComponent } from '../../components/contacto/contacto.component';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [
    CommonModule,
    ContactoComponent
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactoPageComponent { }
