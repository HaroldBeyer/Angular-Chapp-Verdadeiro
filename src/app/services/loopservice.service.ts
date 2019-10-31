import { Conta } from "./../models/conta";
import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoopserviceService {
  readonly URL = `http://localhost:3000/api`;
  headerDefault: HttpHeaders;
  accessToken = localStorage.getItem("accessToken");
  constructor(private http: HttpClient) {
    this.headerDefault = new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  criarUsuario(usuario: Usuario): Observable<any> {
    if (usuario && usuario.email && usuario.senha) {
      const json = {
        email: usuario.email,
        password: usuario.senha
      };
      //URL + "/Users"
      return this.http.post(this.URL + "/Users", json, {
        headers: this.headerDefault
      });
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    if (usuario && usuario.email && usuario.senha) {
      return this.http.post(
        this.URL + "/Users/login?include=user",
        {
          email: usuario.email,
          password: usuario.senha
        },
        { headers: this.headerDefault }
      );
    }
    return null;
  }

  getContas(isRecebimento: Boolean): Observable<Conta[]> {
    if (isRecebimento) {
      return this.http.get<Conta[]>(
        this.URL + `/recebimentos?access_token=${this.accessToken}`
      );
    } else {
      return this.http.get<Conta[]>(
        this.URL + `/pagamentos?access_token=${this.accessToken}`
      );
    }
  }

  postConta(conta: Conta, isRecebimento: Boolean): Observable<Conta> {
    if (isRecebimento) {
      return this.http
        .post(
          this.URL + `/recebimentos?access_token=${this.accessToken}`,
          conta,
          {
            headers: this.headerDefault
          }
        )
        .pipe(map(changes => new Conta(changes)));
    } else {
      return this.http
        .post(
          this.URL + `/pagamentos?access_token=${this.accessToken}`,
          conta,
          {
            headers: this.headerDefault
          }
        )
        .pipe(map(changes => new Conta(changes)));
    }
  }
  deleteConta(id: String, isRecebimento: Boolean): Observable<Conta> {
    if (isRecebimento) {
      return this.http
        .delete(
          this.URL + `/recebimentos/` + id + `?access_token=${this.accessToken}`
        )
        .pipe(map(changes => new Conta(changes)));
    } else {
      return this.http
        .delete(
          this.URL + `/pagamentos/` + id + `?access_token=${this.accessToken}`
        )
        .pipe(map(changes => new Conta(changes)));
    }
  }
  editConta(conta: Conta, isRecebimento: Boolean): Observable<Conta> {
    if (isRecebimento) {
      return this.http
        .put(
          this.URL +
            `/recebimentos/` +
            conta.id +
            `?access_token=${this.accessToken}`,
          conta
        )
        .pipe(map(changes => new Conta(changes)));
    } else {
      return this.http
        .put(
          this.URL +
            `/pagamentos/` +
            conta.id +
            `?access_token=${this.accessToken}`,
          conta
        )
        .pipe(map(changes => new Conta(changes)));
    }
  }
  logoutUser() {
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${this.accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<Usuario>(url_api, { headers: this.headerDefault });
  }
}
