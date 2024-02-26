import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dvl-iot',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dvl-iot.component.html',
  styleUrl: './dvl-iot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DvlIotComponent { }
