import { Routes } from '@angular/router';
import { Home } from '../components/home';
import { Login } from '../components/login';
import { AuthorizedClients } from '../components/authorized-clients';
import { Clients } from '../components/clients';
import { PersonalAccessTokens } from '../components/personal-access-tokens';
import { AuthGuard } from '../common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'authorized-clients',   component: AuthorizedClients, canActivate: [AuthGuard] },
  { path: 'clients',   component: Clients, canActivate: [AuthGuard] },
  { path: 'personal-access-tokens',   component: PersonalAccessTokens, canActivate: [AuthGuard] },
  { path: '**',     component: Login },
];
