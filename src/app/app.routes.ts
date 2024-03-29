import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { userRoleGuard } from './guards/user-role.guard';
import { editOwnUserGuard } from './guards/edit-own-user.guard';
import { userRoleGuardTogether } from './guards/user-role-together.guard';

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
                canActivate: [userRoleGuard],
                loadComponent: () => import('./admin/pages/usuarios/usuarios.component')
            },
            {
                path: 'edit-usuario/:id',
                canActivate: [editOwnUserGuard],
                loadComponent: () => import('./admin/pages/edit-usuario/edit-usuario.component')
            },
            {
                path: 'politicas',
                canActivate: [userRoleGuardTogether],
                loadComponent: () => import('./admin/pages/politicas/politicas.component')
            },
            {
                path: 'datos',
                canActivate: [userRoleGuardTogether],
                loadComponent: () => import('./admin/pages/datos/datos.component')
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
