import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:9000/reportes';

  constructor(private http: HttpClient) {}

  getReporte(year: number): Observable<Reporte> {
    return this.http.get<Reporte>(`${this.apiUrl}/${year}`);
  }
}
