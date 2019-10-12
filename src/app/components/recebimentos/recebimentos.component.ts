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
  constructor(private loopService: LoopserviceService) {}

  ngOnInit() {
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
      console.log(this.recebimentos);
    });
  }
}
