import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../modelos/usuario.model';
import { Publicacion } from '../modelos/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  constructor(private http: HttpClient) { }

  getPublicacion(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${environment.url_gateway}/publicacion/${id}`);
  }
  crear(laPublicacion: Publicacion) {
   return this.http.post(`${environment.url_gateway}/publicacion`, laPublicacion);
    }
  editar(id:string,laPublicacion: Publicacion) {
   return this.http.put(`${environment.url_gateway}/publicacion/${id}`,laPublicacion);
    }

  listar(): Observable<Publicacion[]> {
   return this.http.get<Publicacion[]>(`${environment.url_gateway}/publicacion`);
  }

  eliminar(id: string): Observable<Publicacion> {
    return this.http.delete<Publicacion>(`${environment.url_gateway}/publicacion/${id}`);
  }

}
