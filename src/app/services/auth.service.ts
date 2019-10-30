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
    const userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      return new Usuario(userString);
    } else {
      return null;
    }
  }
}
