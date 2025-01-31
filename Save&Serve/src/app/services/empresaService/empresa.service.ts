import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private ulr = 'http://localhost:9000/empresas'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.ulr);
  }

  getById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.ulr}/${id}`);
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.ulr, empresa);
  }

  update(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.ulr}/${id}`, empresa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ulr}/${id}`);
  }

  getEmpresasByTipo(tipo: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.ulr}/tipo/${tipo}`);
  }
}
