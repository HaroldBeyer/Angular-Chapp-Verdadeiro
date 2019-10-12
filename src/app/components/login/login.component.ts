import { LoopserviceService } from "./../../services/loopservice.service";
import { Usuario } from "./../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  constructor(
    private loopService: LoopserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit(form: NgForm) {
    this.loopService.login(form.value).subscribe(res => {
      console.log("Olha aí Haroldo: " + res);
      this.router.navigateByUrl("/pagamentos");
    });
    console.log(form.value);
  }
}
