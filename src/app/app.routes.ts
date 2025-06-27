import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/login/login.component';
import { BookDashboardComponent } from './feature/books/book-dashboard/book-dashboard.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'books', component:BookDashboardComponent,canActivate: [authGuard], }
];
