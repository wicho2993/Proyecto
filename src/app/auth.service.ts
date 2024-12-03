import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;
  private  apiLogin = 'https://localhost:8100/api/sign/login';
  private  apiSign = 'https://localhost:8100/api/sign/signup';

  constructor(private http: HttpClient )
   { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    // Aquí deberías hacer la llamada a tu API o lógica de autenticación.
    const postData = {
      NombreUsuario: username, // Cambiamos "username" por "NombreUsuario"
      Contrasena: password  
    };
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });
    
    // Retornamos el observable de la solicitud POST
    return this.http.post<any>(this.apiSign, JSON.stringify(postData), { headers, observe: 'response' });
  }
  signup(username: string, password: string): Observable<HttpResponse<any>> {
    const postData = {
      NombreUsuario: username, // Cambiamos "username" por "NombreUsuario"
      Contrasena: password  
    };
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });
  
    // Retornamos el observable de la solicitud POST
    return this.http.post<any>(this.apiSign, JSON.stringify(postData), { headers, observe: 'response' });
  }



  logout() {
    this.isAuthenticated = false;
  }
  setLogged(){
    this.isAuthenticated = true;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

