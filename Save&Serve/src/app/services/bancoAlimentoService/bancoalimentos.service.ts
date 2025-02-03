// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class BancoalimentosService {
//   private url = 'http://localhost:9000/bancos'; //nube

//   constructor(private http: HttpClient) { }

//   getAll(): Observable<BancoDeAlimentos[]> {
//     return this.http.get<BancoDeAlimentos[]>(this.url);
//   }

//   getById(id: number): Observable<BancoDeAlimentos> {
//     return this.http.get<BancoDeAlimentos>(`${this.url}/${id}`);
//   }

//   create(banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
//     return this.http.post<BancoDeAlimentos>(this.url, banco);
//   }

//   update(id: number, banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
//     return this.http.put<BancoDeAlimentos>(`${this.url}/${id}`, banco);
//   }

//   delete(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.url}/${id}`);
//   }
// }

//El de atras es el antiguo, no borro por si la lio

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

@Injectable({
  providedIn: 'root'
})
export class BancoalimentosService {
  private url = 'http://localhost:9000/bancos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BancoDeAlimentos[]> {
    return this.http.get<BancoDeAlimentos[]>(this.url);
  }

  getById(id: number): Observable<BancoDeAlimentos> {
    return this.http.get<BancoDeAlimentos>(`${this.url}/${id}`);
  }

  create(banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
    return this.http.post<BancoDeAlimentos>(this.url, banco);
  }

  update(id: number, banco: BancoDeAlimentos): Observable<BancoDeAlimentos> {
    return this.http.put<BancoDeAlimentos>(`${this.url}/${id}`, banco);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Método para obtener bancos con sus ubicaciones formateadas
  getAllWithLocations(): Observable<BancoDeAlimentos[]> {
    return this.getAll();
  }
}