import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTransporte } from '../models/tipo-transporte.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTransporteService {
  private apiUrl = 'http://localhost:8080/api/tipos-transporte';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TipoTransporte[]> {
    return this.http.get<TipoTransporte[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoTransporte> {
    return this.http.get<TipoTransporte>(`${this.apiUrl}/${id}`);
  }

  create(tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.post<TipoTransporte>(this.apiUrl, tipoTransporte);
  }

  update(id: number, tipoTransporte: TipoTransporte): Observable<TipoTransporte> {
    return this.http.put<TipoTransporte>(`${this.apiUrl}/${id}`, tipoTransporte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}