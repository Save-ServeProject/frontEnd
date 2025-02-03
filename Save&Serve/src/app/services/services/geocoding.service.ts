import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from './geocoding.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-haztevoluntario',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './haztevoluntario.component.html',
  styleUrl: './haztevoluntario.component.scss'
})
export class HaztevoluntarioComponent implements OnInit {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  constructor(private geocodingService: GeocodingService) { }

  ngOnInit(): void {
    // ... resto del código del ngOnInit ...
  }

  // Nuevo método para obtener coordenadas
  obtenerCoordenadas(calle: string, ciudad: string): void {
    this.geocodingService.obtenerCoordenadas(calle, ciudad).subscribe(
      coordenadas => {
        if (coordenadas) {
          console.log(`Coordenadas obtenidas: ${coordenadas.lat}, ${coordenadas.lng}`);
          this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, `${calle}, ${ciudad}`);
        } else {
          console.error('No se encontraron coordenadas para esta dirección');
        }
      }
    );
  }

  // ... resto del código del componente ...
}