import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donacion } from '../../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private url = 'http://localhost:9000/donaciones'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(this.url);
  }

  getById(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.url}/${id}`);
  }

  create(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(this.url, donacion);
  }

  update(id: number, donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.url}/${id}`, donacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.url}/empresa/${empresaId}`);
  }

  getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.url}/bancos/${bancoId}`);
  }

  //leti

  getBancos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/bancos`);
  }

  createDonacion(donacion: any): Observable<any> {
    return this.http.post(`${this.url}/donaciones`, donacion);
  }
}
