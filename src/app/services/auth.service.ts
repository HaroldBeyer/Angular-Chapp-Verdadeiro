import { Usuario } from "./../models/usuario";
import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }
  setUser(user: Usuario): void {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
  getCurrentUser(): Usuario {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      return new Usuario(user_string);
    } else {
      return null;
    }
  }
}
