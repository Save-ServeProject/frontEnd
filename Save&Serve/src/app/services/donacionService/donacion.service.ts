// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Donacion } from '../../models/donacion.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DonacionService {
//   private url = 'http://localhost:9000/donaciones'; //nube

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(this.url);
//   }

//   getById(id: number): Observable<Donacion> {
//     return this.http.get<Donacion>(`${this.url}/${id}`);
//   }

//   create(donacion: Donacion): Observable<Donacion> {
//     return this.http.post<Donacion>(this.url, donacion);
//   }

//   update(id: number, donacion: Donacion): Observable<Donacion> {
//     return this.http.put<Donacion>(`${this.url}/${id}`, donacion);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }

//   getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(`${this.url}/empresa/${empresaId}`);
//   }

//   getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
//     return this.http.get<Donacion[]>(`${this.url}/bancos/${bancoId}`);
//   }

//   //leti

//   getBancos(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.url}/bancos`);
//   }

//   createDonacion(donacion: any): Observable<any> {
//     return this.http.post(`${this.url}/donaciones`, donacion);
//   }
// }


///cambios

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Donacion } from '../../models/donacion.model';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private baseUrl = 'http://localhost:9000'; // URL base
  private donacionesUrl = `${this.baseUrl}/donaciones`; // URL para donaciones
  private bancosUrl = `${this.baseUrl}/bancos`; // URL específica para bancos

  constructor(private http: HttpClient) { }

  getAll(): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(this.donacionesUrl);
  }

  getById(id: number): Observable<Donacion> {
    return this.http.get<Donacion>(`${this.donacionesUrl}/${id}`);
  }

  create(donacion: Donacion): Observable<Donacion> {
    return this.http.post<Donacion>(this.donacionesUrl, donacion);
  }

  update(id: number, donacion: Donacion): Observable<Donacion> {
    return this.http.put<Donacion>(`${this.donacionesUrl}/${id}`, donacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.donacionesUrl}/${id}`);
  }

  // getDonacionesByEmpresa(empresaId: number): Observable<Donacion[]> {
  //   return this.http.get<Donacion[]>(`${this.donacionesUrl}/empresa/${empresaId}`);
  // }

  getDonacionesByBanco(bancoId: number): Observable<Donacion[]> {
    return this.http.get<Donacion[]>(`${this.donacionesUrl}/bancos/${bancoId}`);
  }

  getBancos(): Observable<any[]> {
    console.log('Solicitando bancos...');
    return this.http.get<any[]>(this.bancosUrl).pipe(
      tap(response => console.log('Respuesta de bancos:', response)),
      catchError(error => {
        console.error('Error al obtener bancos:', error);
        return throwError(() => error);
      })
    );
  }

  createDonacion(donacion: any): Observable<any> {
    return this.http.post(this.donacionesUrl, donacion).pipe(
      tap(response => console.log('Donación creada:', response)),
      catchError(error => {
        console.error('Error al crear donación:', error);
        return throwError(() => error);
      })
    );
  }


  getTransportes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/transportes`).pipe(
      tap(response => console.log('Respuesta transportes:', response)),
      catchError(error => {
        console.error('Error al obtener transportes:', error);
        return throwError(() => error);
      })
    );
  }

  getAlergenos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/alergenos`).pipe(
      tap(response => console.log('Respuesta alérgenos:', response)),
      catchError(error => {
        console.error('Error al obtener alérgenos:', error);
        return throwError(() => error);
      })
    );
  }

  // getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/empresa/${empresaId}`);
  // }
// donacion.service.ts
getDonacionesByEmpresa(empresaId: number): Observable<any[]> {
  // Usar la URL completa de tu endpoint
  return this.http.get<any[]>(`${this.baseUrl}/donaciones/empresa/${empresaId}`);
}

}