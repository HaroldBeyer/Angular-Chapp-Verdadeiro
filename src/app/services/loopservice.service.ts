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
      return this.http.post("http://localhost:3000/api/Users", json, {
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

  getRecebimentos(): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      `http://localhost:3000/api/recebimentos?access_token=${this.accessToken}`
    );
  }
  postRecebimento(recebimento: Conta): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/recebimentos?access_token=${this.accessToken}`,
      recebimento,
      {
        headers: this.headerDefault
      }
    );
  }
  deleteRecebimento(id: String): Observable<{}> {
    return this.http.delete(
      `http://localhost:3000/api/recebimentos` +
        `/` +
        id +
        `?access_token=${this.accessToken}`
    );
  }
  editRecebimento(recebimento: Conta): Observable<any> {
    return this.http.put(
      `http://localhost:3000/api/recebimentos` +
        `/` +
        recebimento.id +
        `?access_token=${this.accessToken}`,
      recebimento
    );
  }
  getPagamentos(): Observable<Conta[]> {
    const url = `http://localhost:3000/api/pagamentos?access_token=${this.accessToken}`;
    // return this.http.get(<Conta[]>url);
    return this.http.get<Conta[]>(url);
  }

  postPagamento(pagamento: Conta): Observable<any> {
    return this.http.post(
      `http://localhost:3000/api/pagamentos?access_token=${this.accessToken}`,
      pagamento,
      {
        headers: this.headerDefault
      }
    );
  }
  deletePagamento(id: String): Observable<{}> {
    return this.http.delete(
      `http://localhost:3000/api/pagamentos` +
        "/" +
        id +
        `?access_token=${this.accessToken}`
    );
  }
  editPagamento(pagamento: Conta): Observable<any> {
    return this.http.put(
      `http://localhost:3000/api/pagamentos` +
        "/" +
        pagamento.id +
        `?access_token=${this.accessToken}`,
      pagamento
    );
  }
  logoutUser() {
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${this.accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<Usuario>(url_api, { headers: this.headerDefault });
  }
}
