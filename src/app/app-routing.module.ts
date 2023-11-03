import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { PagesRoutingModule } from './pages/pages-routing.module';


const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'create', component: CreatePageComponent
  },
  {
    path: "", component: PagesComponent, loadChildren: () => PagesRoutingModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
