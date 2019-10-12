import { LoopserviceService } from "./services/loopservice.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { CriarcontaComponent } from "./components/criarconta/criarconta.component";
import { RecebimentosComponent } from "./components/recebimentos/recebimentos.component";
import { PagamentosComponent } from "./components/pagamentos/pagamentos.component";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CriarcontaComponent,
    RecebimentosComponent,
    PagamentosComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [LoopserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
