import { LoopserviceService } from "./../../services/loopservice.service";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  logado: Boolean;
  constructor(
    private route: Router,
    private authService: AuthService,
    private loopService: LoopserviceService
  ) {
    const current = this.authService.getCurrentUser();
    console.log("Current: " + current);
    if (current) {
      this.logado = true;
    }
  }

  ngOnInit() {}

  logout() {
    this.loopService.logoutUser();
    this.route.navigateByUrl("/");
  }
}
