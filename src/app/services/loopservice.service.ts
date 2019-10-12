import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoopserviceService {
  readonly URL = "http://localhost:3000/api";
  constructor(private http: HttpClient) {}

  criarUsuario(usuario: Usuario): Observable<any> {
    if (usuario && usuario.email && usuario.senha) {
      const json = {
        email: usuario.email,
        password: usuario.senha
      };
      //URL + "/Users"
      return this.http.post("http://localhost:3000/api/Users", json, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      });
    }
    return null;
  }
}
