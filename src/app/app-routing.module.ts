import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PagamentosComponent } from "./components/pagamentos/pagamentos.component";
import { RecebimentosComponent } from "./components/recebimentos/recebimentos.component";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CriarcontaComponent } from "./components/criarconta/criarconta.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  { path: "recebimentos", component: RecebimentosComponent },
  { path: "pagamentos", component: PagamentosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
