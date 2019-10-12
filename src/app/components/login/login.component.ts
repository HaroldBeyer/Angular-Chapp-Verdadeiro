import { LoopserviceService } from "./../../services/loopservice.service";
import { Usuario } from "./../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  constructor(private loopService: LoopserviceService) {}

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
