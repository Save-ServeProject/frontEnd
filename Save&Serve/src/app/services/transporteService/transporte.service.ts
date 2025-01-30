import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporte } from '../models/transporte.model';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {
  private apiUrl = 'http://localhost:8080/api/transportes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.apiUrl);
  }

  getById(id: number): Observable<Transporte> {
    return this.http.get<Transporte>(`${this.apiUrl}/${id}`);
  }

  create(transporte: Transporte): Observable<Transporte> {
    return this.http.post<Transporte>(this.apiUrl, transporte);
  }

  update(id: number, transporte: Transporte): Observable<Transporte> {
    return this.http.put<Transporte>(`${this.apiUrl}/${id}`, transporte);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByTipoTransporte(tipoId: number): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(`${this.apiUrl}/tipo/${tipoId}`);
  }
}