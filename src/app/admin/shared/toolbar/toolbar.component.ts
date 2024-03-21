import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  template: `
      <mat-toolbar color="primary" class="example-toolbar">
        <button mat-icon-button (click)="emitEvent()"><mat-icon>menu</mat-icon></button>
        <h1 class="example-app-name">Responsive App</h1>
    </mat-toolbar>
  `,
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Output() toggle = new EventEmitter<any>();

  emitEvent() {
    this.toggle.emit();
  }
}
