import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

@Injectable({
  providedIn: 'root'
})
export class BancoalimentosService {
  private url = 'http://localhost:9000/bancos';

  constructor(private http: HttpClient) { }

 
}
