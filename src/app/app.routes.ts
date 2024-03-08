import { Routes } from '@angular/router';

export const routes: Routes = [
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
    }
];
