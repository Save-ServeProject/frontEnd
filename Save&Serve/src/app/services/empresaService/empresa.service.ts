import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  private url = 'http://localhost:9000/empresas'; //nube

  constructor(private http: HttpClient) { }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }

  getById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.url, empresa);
  }

  update(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.url}/${id}`, empresa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getEmpresasByTipo(tipo: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.url}/tipo/${tipo}`);
  }

  //Leti

  getEmpresa(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateEmpresa(id: number, empresa: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, empresa);
  }

  getEmpresaByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}/email/${email}`);
  }
}
