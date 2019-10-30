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
  valorTotal = 0;
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
    this.loopService.getPagamentos2().subscribe(res => {});
  }

  private loadDados() {
    this.valorTotal = 0;
    if (this.contas) {
      this.contas = null;
    }
    if (this.isRecebimento()) {
      this.loopService.getRecebimentos().subscribe(res => {
        this.getContas(res);
      });
    } else {
      this.loopService.getPagamentos().subscribe(res => {
        this.getContas(res);
      });
    }
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
    if (this.isRecebimento()) {
      this.loopService.postRecebimento(form.value).subscribe(res => {
        this.aviso = "Recebimento cadastrado com sucesso!";
        this.loadDados();
      });
    } else {
      this.loopService.postPagamento(form.value).subscribe(res => {
        this.aviso = "Pagamento cadastrado com sucesso!";
        this.loadDados();
      });
    }
  }
  deletar(id: string) {
    if (this.isRecebimento()) {
      this.loopService.deleteRecebimento(id).subscribe(res => {
        this.aviso = "Recebimento removido com sucesso!";
        this.loadDados();
      });
    } else {
      this.loopService.deletePagamento(id).subscribe(res => {
        this.aviso = "Pagamento removido com sucesso!";
        this.loadDados();
      });
    }
  }
  editar(id: string) {
    this.edit = id;
  }
  onEditSubmit(form: NgForm) {
    if (this.isRecebimento()) {
      const rec = new Conta(form.value);
      rec.id = this.edit;
      this.loopService.editRecebimento(rec).subscribe(res => {
        this.aviso = "Item " + rec.nome + " editado com sucesso!";
        this.edit = null;
        this.loadDados();
      });
    } else {
      const rec = new Conta(form.value);
      rec.id = this.edit;
      this.loopService.editPagamento(rec).subscribe(res => {
        this.aviso = "Item " + rec.nome + " editado com sucesso!";
        this.edit = null;
        this.loadDados();
      });
    }
  }
  logout() {
    this.loopService.logoutUser();
    this.route.navigateByUrl("/");
  }

  isRecebimento(): Boolean {
    if (this.path == "Recebimento") {
      return true;
    }
    return false;
  }
}
