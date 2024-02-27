import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeadComponent } from '../../components/head/head.component';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dvl-satelital',
  standalone: true,
  imports: [
    CommonModule,
    HeadComponent
  ],
  templateUrl: './dvl-satelital.component.html',
  styleUrl: './dvl-satelital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlSatelitalComponent {

}
