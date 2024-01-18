import {CanActivateFn, Router, Routes} from '@angular/router';
import {WelcomeComponent} from "./compo/welcome/welcome.component";
import {HomeComponent} from "./compo/home/home.component";
import {inject} from "@angular/core";
import {AuthenticateComponent} from "./compo/authenticate/authenticate.component";
import {RegisterComponent} from "./compo/register/register.component";
import {AuthService} from "./auth.service";

const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn) return true;
  inject(Router).navigate(['authenticate']);
  return true;
}
export const routes: Routes = [
  {path: '', component: WelcomeComponent, pathMatch:'full'},
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path: 'authenticate', component: AuthenticateComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''}
];
