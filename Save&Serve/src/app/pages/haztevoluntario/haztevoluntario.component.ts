import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {
    // Cargar los estilos de Leaflet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Inicializar el mapa después de un pequeño delay para asegurar que el DOM está listo
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  private initMap(): void {
    // Inicializar el mapa en Madrid
    this.map = L.map('mapa').setView([40.4168, -3.7038], 6);

    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  mostrarUbicacion(lat: number, lng: number, titulo: string): void {
    if (!this.map) {
      setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
      return;
    }

    // Si ya existe un marcador, lo eliminamos
    if (this.marker) {
      this.marker.remove();
    }

    // Crear nuevo marcador
    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`<div class="popup-content">
        <h6>${titulo}</h6>
        <p>Haz click para más información</p>
      </div>`)
      .openPopup();

    // Centrar el mapa en la ubicación
    this.map.setView([lat, lng], 15);
  }
}