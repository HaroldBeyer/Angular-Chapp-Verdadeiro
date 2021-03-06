import { LoopserviceService } from "./services/loopservice.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { CriarcontaComponent } from "./components/criarconta/criarconta.component";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./components/home/home.component";
import { ContaComponent } from "./components/conta/conta.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CriarcontaComponent,
    HomeComponent,
    ContaComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [LoopserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
