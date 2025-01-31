import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulos } from '../../models/articulos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private url = 'http://localhost:9000/articulos'; //nube
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Articulos[]>(this.url);
  }
  getById(id: number) : Observable<Articulos> {
    return this.http.get<Articulos>(`${this.url}/${id}`);
  }
  obtenerArticuloPorId(id: number): Observable<Articulos> {
    return this.http.get<Articulos>(`${this.url}/${id}`);
  }
  
  getAllByTitulo(titulo: string) {
    return this.http.get<Articulos[]>(`${this.url}/titulo/${titulo}`);
  }
  obtenerArticulos(id?: string): Observable<Articulos[]> {
    return this.http.get<Articulos[]>(this.url);
  }
  create(articulo: Articulos) {
    return this.http.post<Articulos>(this.url, articulo, { headers: this.headers });
  }
  update(id: number, articulo: Articulos) : Observable<Articulos> {
    return this.http.put<Articulos>(`${this.url}/${id}`, articulo);
  }
  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
