export class Conta {
  nome: string;
  valor: number;
  id: string | null;

  /*Conta(nome: string, valor: number) {
    this.nome = nome;
    this.valor = valor;
  }*/
  constructor(obj) {
    if (obj) {
      this.nome = obj.nome;
      this.valor = obj.valor;
    }
  }
}
