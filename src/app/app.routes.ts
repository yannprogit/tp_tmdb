import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SerieListComponent } from './components/serie-list/serie-list.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/movie-list/movie-list.component').then(m => m.MovieListComponent)
    },
    {
        path: 'series',
        loadComponent: () => import('./components/serie-list/serie-list.component').then(m => m.SerieListComponent)
    }
];
