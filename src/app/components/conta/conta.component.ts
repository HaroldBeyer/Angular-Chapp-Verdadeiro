import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { LoopserviceService } from "./../../services/loopservice.service";
import { Conta } from "./../../models/conta";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-conta",
  templateUrl: "./conta.component.html",
  styleUrls: ["./conta.component.css"]
})
export class ContaComponent implements OnInit {
  contas: Conta[];
  valorTotal: number;
  receb: Conta;
  aviso: string;
  edit: string;
  path: string;

  constructor(
    private loopService: LoopserviceService,
    private authService: AuthService,
    private route: Router
  ) {
    this.receb = new Conta(null);
    const current = this.authService.getCurrentUser();
    // console.log("Current: " + current);
    if (!current) {
      this.redirecionar(route);
    }
    switch (route.routerState.snapshot.url) {
      case "/pagamentos": {
        this.path = "Pagamento";
        break;
      }
      case "/recebimentos": {
        this.path = "Recebimento";
        break;
      }
      default: {
        this.redirecionar(route);
        break;
      }
    }
  }

  private redirecionar(route: Router) {
    alert("Usuário não logado!");
    route.navigateByUrl("/");
    console.warn("Usuário não logado");
  }

  ngOnInit() {
    this.loadDados();
  }

  private loadDados() {
    this.valorTotal = 0;
    if (this.contas) {
      this.contas = null;
    }
    this.loopService.getContas(this.isRecebimento()).subscribe(res => {
      this.getContas(res);
    });
  }

  private getContas(res: Conta[]) {
    for (const conta of res) {
      this.valorTotal += conta.valor;
      if (!this.contas) {
        this.contas = [conta];
      } else {
        this.contas.push(conta);
      }
    }
  }

  onSubmit(form: NgForm) {
    const conta: Conta = new Conta(form.value);
    conta.data = new Date();
    this.loopService.postConta(conta, this.isRecebimento()).subscribe(res => {
      this.aviso = "Item " + res.nome + " cadastrado com sucesso!";
      this.loadDados();
    });
  }
  deletar(id: string) {
    this.loopService.deleteConta(id, this.isRecebimento()).subscribe(res => {
      this.aviso = "Item " + res.nome + " removido com sucesso!";
      this.loadDados();
    });
  }
  editar(id: string) {
    this.edit = id;
  }
  onEditSubmit(form: NgForm) {
    const sub = new Conta(form.value);
    sub.id = this.edit;
    sub.data = new Date();
    this.loopService.editConta(sub, this.isRecebimento()).subscribe(res => {
      this.aviso = "Item" + res.nome + "editado com sucesso!";
      this.edit = null;
      this.loadDados();
    });
  }
  logout() {
    this.loopService.logoutUser();
    this.route.navigateByUrl("/");
  }

  isRecebimento(): Boolean {
    if (this.path == "Recebimento") return true;

    return false;
  }
}
