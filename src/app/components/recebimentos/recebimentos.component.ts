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
  constructor(private loopService: LoopserviceService) {
    this.receb = new Conta();
  }

  ngOnInit() {
    this.loadDados();
  }

  private loadDados() {
    this.loopService.getRecebimentos().subscribe(res => {
      const rees = Object.keys(res);
      for (const recebimento of rees) {
        this.valorTotal += res[recebimento]["valor"];
        const conta: Conta = {
          nome: res[recebimento]["nome"],
          valor: res[recebimento]["valor"]
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
}
