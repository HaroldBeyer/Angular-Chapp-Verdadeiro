import { ContaComponent } from "./components/conta/conta.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CriarcontaComponent } from "./components/criarconta/criarconta.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: "signup",
    component: CriarcontaComponent
  },
  {
    path: "signin",
    component: LoginComponent
  },
  {
    path: "recebimentos",
    component: ContaComponent
  },
  {
    path: "pagamentos",
    component: ContaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
