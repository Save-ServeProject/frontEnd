import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alergenos } from '../alergenosService/';

@Injectable({
  providedIn: 'root'
})
export class AlergenosService {
  private apiUrl = 'http://localhost:8080/api/alergenos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alergenos[]> {
    return this.http.get<Alergenos[]>(this.apiUrl);
  }

  getById(id: number): Observable<Alergenos> {
    return this.http.get<Alergenos>(`${this.apiUrl}/${id}`);
  }

  create(alergeno: Alergenos): Observable<Alergenos> {
    return this.http.post<Alergenos>(this.apiUrl, alergeno);
  }

  update(id: number, alergeno: Alergenos): Observable<Alergenos> {
    return this.http.put<Alergenos>(`${this.apiUrl}/${id}`, alergeno);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}