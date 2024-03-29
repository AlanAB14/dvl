import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { TokenDataService } from '../services/token-data.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    ToolbarComponent,
    RouterModule,
    MatIcon
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent implements OnInit{
  mobileQuery: MediaQueryList;
  dataUser: any = signal(null);
  tokenDataService = inject(TokenDataService)
  fillerNav = [
    {
      title: 'Usuarios',
      route: 'usuarios',
      icon: 'person'
    },
    {
      title: 'Políticas',
      route: 'politicas',
      icon: 'lock'
    },
    {
      title: 'Datos',
      route: 'datos',
      icon: 'numbers'
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.dataUser.set(this.tokenDataService.getTokenJson());

    // Quito rutas para usuarios que no son super_admin
    if (this.dataUser().role_id !== 1) {
      this.fillerNav = this.fillerNav.filter(item => item.route !== 'usuarios')
    }

    // Quito rutas para usuarios que no son super_admin, ni admin
    if (this.dataUser().role_id !== 1 && this.dataUser().role_id !== 2) {
      this.fillerNav = this.fillerNav.filter(item => item.route !== 'politicas')
      this.fillerNav = this.fillerNav.filter(item => item.route !== 'datos')
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
