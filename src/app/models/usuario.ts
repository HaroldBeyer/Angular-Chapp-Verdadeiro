export class Usuario {
  email: string;
  senha: string;
  constructor(obj?) {
    if (obj && obj.email && obj.senha) {
      this.email = obj.email;
      this.senha = obj.senha;
    }
  }
}
