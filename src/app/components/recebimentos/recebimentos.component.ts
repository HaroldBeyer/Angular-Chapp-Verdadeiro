import { NgForm } from "@angular/forms";
import { LoopserviceService } from "./../../services/loopservice.service";
import { Conta } from "./../../models/conta";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recebimentos",
  templateUrl: "./recebimentos.component.html",
  styleUrls: ["./recebimentos.component.css"]
})
export class RecebimentosComponent implements OnInit {
  recebimentos: Conta[];
  valorTotal = 0;
  receb: Conta;
  aviso: string;
  edit: string;
  constructor(private loopService: LoopserviceService) {
    this.receb = new Conta(null);
  }

  ngOnInit() {
    this.loadDados();
  }

  private loadDados() {
    this.valorTotal = 0;
    if (this.recebimentos) {
      this.recebimentos = null;
    }
    this.loopService.getRecebimentos().subscribe(res => {
      const rees = Object.keys(res);
      for (const recebimento of rees) {
        this.valorTotal += res[recebimento]["valor"];
        const conta: Conta = {
          nome: res[recebimento]["nome"],
          valor: res[recebimento]["valor"],
          id: res[recebimento]["id"]
        };
        if (!this.recebimentos) {
          this.recebimentos = [conta];
        } else {
          this.recebimentos.push(conta);
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    this.loopService.postRecebimento(form.value).subscribe(res => {
      this.aviso = "Recebimento cadastrado com sucesso!";
      this.loadDados();
    });
  }
  deletar(id: String) {
    this.loopService.deleteRecebimento(id).subscribe(res => {
      this.aviso = "Recebimento removido com sucesso!";
      this.loadDados();
    });
  }
  editar(id: string) {
    this.edit = id;
  }
  onEditSubmit(form: NgForm) {
    const rec = new Conta(form.value);
    rec.id = this.edit;
    this.loopService.editRecebimento(rec).subscribe(res => {
      this.aviso = "Item " + rec.nome + " editado com sucesso!";
      this.edit = null;
      this.loadDados();
    });
  }
}
