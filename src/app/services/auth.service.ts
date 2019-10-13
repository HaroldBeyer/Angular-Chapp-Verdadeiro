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
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }
  getCurrentUser(): Usuario {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: Usuario = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
}
