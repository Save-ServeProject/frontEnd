import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LineaProducto } from '../../models/lineaProdcuto.model';

@Injectable({
  providedIn: 'root'
})
export class LineaProductoService {
  private apiUrl = 'http://localhost:9000/lineas-producto';

  constructor(private http: HttpClient) { }

  getAll(): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(this.apiUrl);
  }

  getById(id: number): Observable<LineaProducto> {
    return this.http.get<LineaProducto>(`${this.apiUrl}/${id}`);
  }

  create(lineaProducto: LineaProducto): Observable<LineaProducto> {
    return this.http.post<LineaProducto>(this.apiUrl, lineaProducto);
  }

  update(id: number, lineaProducto: LineaProducto): Observable<LineaProducto> {
    return this.http.put<LineaProducto>(`${this.apiUrl}/${id}`, lineaProducto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByDonacion(donacionId: number): Observable<LineaProducto[]> {
    return this.http.get<LineaProducto[]>(`${this.apiUrl}/donacion/${donacionId}`);
  }
}