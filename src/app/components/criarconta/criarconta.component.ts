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
  constructor(private loopService: LoopserviceService) {}

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
