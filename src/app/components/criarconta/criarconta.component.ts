import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { Observable } from "rxjs";
import { LoopserviceService } from "./../../services/loopservice.service";
import { Usuario } from "./../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-criarconta",
  templateUrl: "./criarconta.component.html",
  styleUrls: ["./criarconta.component.css"]
})
export class CriarcontaComponent implements OnInit {
  usuario: Usuario;
  aviso: string;
  constructor(
    private loopService: LoopserviceService,
    private authService: AuthService,
    private router: Router
  ) {
    const current = this.authService.getCurrentUser();
    console.log("Current: " + current);
    if (current) {
      alert("Usuário já está logado!");
      router.navigateByUrl("/recebimentos");
    }
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  onSubmit(form: NgForm) {
    this.loopService
      .criarUsuario(form.value)
      .toPromise()
      .then(res => {
        this.aviso = "Usuário cadastrado com sucesso!";
        console.log("Usuário criado com sucesso!");
      })
      .catch(err => {
        this.aviso = "Erro ao tentar cadastrar usuário" + err;
      });
  }
}
