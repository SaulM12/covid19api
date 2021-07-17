import { MenuComponent } from './menu/menu.component';
import { ClimaInicioComponent } from './clima-inicio/clima-inicio.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MenuComponent },
  {path:'covid', component: HomeComponent},
  {path:'clima',component: ClimaInicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
