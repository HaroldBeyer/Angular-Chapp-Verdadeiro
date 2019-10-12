import { Conta } from "./../models/conta";
import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoopserviceService {
  readonly URL = "http://localhost:3000/api";
  headerDefault: HttpHeaders;
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
        this.URL + "/Users/login",
        {
          email: usuario.email,
          password: usuario.senha
        },
        { headers: this.headerDefault }
      );
    }
    return null;
  }

  getRecebimentos(): Observable<{}> {
    return this.http.get("http://localhost:3000/api/recebimentos");
  }
  postRecebimento(recebimento: Conta): Observable<any> {
    return this.http.post(
      "http://localhost:3000/api/recebimentos",
      recebimento,
      {
        headers: this.headerDefault
      }
    );
  }
}
