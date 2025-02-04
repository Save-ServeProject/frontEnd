import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { Empresa } from '../../models/empresa.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-informacionempresa',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './informacionempresa.component.html',
  styleUrl: './informacionempresa.component.scss'
})
export class InformacionempresaComponent implements OnInit {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  empresas: Empresa[] = [];

  constructor(
    private geocodingService: GeocodingService,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.initMap();
    this.cargarEmpresas();
  }

  private initMap(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    setTimeout(() => {
      this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }, 100);
  }

  private cargarEmpresas(): void {
    this.empresaService.getAll().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        empresas.forEach(empresa => {
          this.obtenerCoordenadas(empresa.direccion, empresa.ciudad, empresa.nombre);
        });
      },
      error: (error) => console.error('Error al cargar bancos:', error)
    });
  }

  obtenerCoordenadas(direccion: string, ciudad: string, nombre: string): void {
    this.geocodingService.obtenerCoordenadas(direccion, ciudad).subscribe({
      next: (coordenadas) => {
        if (coordenadas) {
          this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, nombre);
        }
      },
      error: (error) => console.error('Error al obtener coordenadas:', error)
    });
  }

  mostrarUbicacion(lat: number, lng: number, titulo: string): void {
    if (!this.map) {
      setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
      return;
    }

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`
        <div class="popup-content">
          <h6>${titulo}</h6>
          <p>Haz click para más información</p>
        </div>
      `)
      .openPopup();

    this.map.setView([lat, lng], 15);
  }
}
