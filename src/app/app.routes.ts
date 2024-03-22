import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component'),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/layout.component'),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./admin/pages/home/home.component')
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./admin/pages/usuarios/usuarios.component')
            },
            {
                path: 'edit-usuario/:id',
                loadComponent: () => import('./admin/pages/edit-usuario/edit-usuario.component')
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./client/layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./client/pages/home/home.component')
            },
            {
                path: 'nosotros',
                loadComponent: () => import('./client/pages/nosotros/nosotros.component')
            },
            {
                path: 'certificaciones',
                loadComponent: () => import('./client/pages/certificaciones/certificaciones.component')
            },
            {
                path: 'dvl-iot',
                loadComponent: () => import('./client/pages/dvl-iot/dvl-iot.component')
            },
            {
                path: 'dvl-satelital',
                loadComponent: () => import('./client/pages/dvl-satelital/dvl-satelital.component')
            },
            {
                path: 'novedades',
                loadComponent: () => import('./client/pages/novedades/novedades.component')
            },
            {
                path: 'contacto',
                loadComponent: () => import('./client/pages/contacto/contacto.component')
            }
        ]
    },

];
