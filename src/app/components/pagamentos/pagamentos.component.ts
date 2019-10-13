import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { NgForm } from "@angular/forms";
import { LoopserviceService } from "./../../services/loopservice.service";
import { Conta } from "./../../models/conta";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pagamentos",
  templateUrl: "./pagamentos.component.html",
  styleUrls: ["./pagamentos.component.css"]
})
export class PagamentosComponent implements OnInit {
  pagamentos: Conta[];
  aviso: string;
  edit: string;
  pagam: Conta;
  valorTotal = 0;

  constructor(
    private loopService: LoopserviceService,
    private authService: AuthService,
    private route: Router
  ) {
    this.pagam = new Conta(null);
    const current = this.authService.getCurrentUser();
    console.log("Current: " + current);
    if (!current) {
      alert("Usuário não logado!");
      route.navigateByUrl("/");
      console.warn("Usuário não logado");
    }
  }

  ngOnInit() {
    this.loadDados();
  }
  private loadDados() {
    this.valorTotal = 0;
    if (this.pagamentos) {
      this.pagamentos = null;
    }
    this.loopService.getPagamentos().subscribe(res => {
      const rees = Object.keys(res);
      for (const pagamento of rees) {
        this.valorTotal += res[pagamento]["valor"];
        const conta: Conta = {
          nome: res[pagamento]["nome"],
          valor: res[pagamento]["valor"],
          id: res[pagamento]["id"]
        };
        if (!this.pagamentos) {
          this.pagamentos = [conta];
        } else {
          this.pagamentos.push(conta);
        }
      }
    });
  }
  onSubmit(form: NgForm) {
    this.loopService.postPagamento(form.value).subscribe(res => {
      this.aviso = "Pagamento cadastrado com sucesso!";
      this.loadDados();
    });
  }
  deletar(id: String) {
    this.loopService.deletePagamento(id).subscribe(res => {
      this.aviso = "Pagamento removido com sucesso!";
      this.loadDados();
    });
  }
  editar(id: string) {
    this.edit = id;
  }
  onEditSubmit(form: NgForm) {
    const rec = new Conta(form.value);
    rec.id = this.edit;
    this.loopService.editPagamento(rec).subscribe(res => {
      this.aviso = "Item " + rec.nome + " editado com sucesso!";
      this.edit = null;
      this.loadDados();
    });
  }
  logout() {
    this.loopService.logoutUser();
    this.route.navigateByUrl("/");
  }
}
