export class Conta {
  public nome: string;
  public valor: number;
  public id: string | null;
  public data: Date | null;

  /*Conta(nome: string, valor: number) {
    this.nome = nome;
    this.valor = valor;
  }*/
  constructor(obj) {
    if (obj) {
      this.nome = obj.nome;
      this.valor = obj.valor;
      if (obj.data) {
        this.data = obj.data;
      }
      if (obj.id) {
        this.id = obj.id;
      }
    }
  }
}
