import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from '../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private apiUrl = 'http://localhost:8080/api/donaciones';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(this.apiUrl);
  }

  getById(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.apiUrl}/${id}`);
  }

  create(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(this.apiUrl, donacion);
  }

  update(id: number, donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.apiUrl}/${id}`, donacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.apiUrl}/empresa/${empresaId}`);
  }

  getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.apiUrl}/banco/${bancoId}`);
  }
}
