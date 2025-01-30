import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

@Injectable({
  providedIn: 'root'
})
export class BancoalimentosService {
  private apiUrl = 'http://localhost:9000/bancos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BancoDeAlimentos[]> {
    return this.http.get<BancoDeAlimentos[]>(this.apiUrl);
  }

  getById(id: number): Observable<BancoDeAlimentos> {
    return this.http.get<BancoDeAlimentos>(`${this.apiUrl}/${id}`);
  }

  create(banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
    return this.http.post<BancoDeAlimentos>(this.apiUrl, banco);
  }

  update(id: number, banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
    return this.http.put<BancoDeAlimentos>(`${this.apiUrl}/${id}`, banco);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


