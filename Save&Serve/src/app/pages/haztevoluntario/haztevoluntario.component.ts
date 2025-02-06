//Segundo intento

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeocodingService } from '../../services/geocoding.service';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
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
  private markers: L.Marker[] = [];
  bancos: BancoDeAlimentos[] = [];

  @ViewChild('mapSection') mapSection!: ElementRef;

  constructor(
    private geocodingService: GeocodingService,
    private bancoService: BancoalimentosService
  ) {
    console.log('Componente inicializado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.initMap();
    this.cargarBancos();
  }

  private initMap(): void {
    console.log('Inicializando mapa...');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    setTimeout(() => {
      this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
      console.log('Mapa inicializado');
    }, 100);
  }

  private cargarBancos(): void {
    console.log('Iniciando carga de bancos...');
    this.bancoService.getAll().subscribe({
      next: (bancos) => {
        console.log('Bancos recibidos:', bancos);
        this.bancos = bancos;
        if (bancos.length === 0) {
          console.log('No se recibieron bancos');
        }
        // Opcional: cargar ubicaciones automáticamente
        bancos.forEach(banco => {
          this.obtenerYMostrarUbicacion(banco);
        });
      },
      error: (error) => {
        console.error('Error al cargar bancos de alimentos:', error);
      }
    });
  }

  obtenerYMostrarUbicacion(banco: BancoDeAlimentos): void {
    console.log('Obteniendo ubicación para:', banco);
    this.geocodingService.obtenerCoordenadas(banco.direccion, banco.ciudad).subscribe({
      next: (coordenadas) => {
        if (coordenadas) {
          console.log('Coordenadas obtenidas:', coordenadas);
          this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, banco.nombre);
          this.scrollToMap();
        } else {
          console.error('No se pudieron obtener las coordenadas para:', banco.nombre);
        }
      },
      error: (error) => {
        console.error('Error al obtener coordenadas:', error);
      }
    });
  }

  mostrarUbicacion(lat: number, lng: number, titulo: string): void {
    if (!this.map) {
      setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
      return;
    }

    // Crear nuevo marcador
    const marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`
        <div class="popup-content">
          <h6>${titulo}</h6>
          <p>Haz click para más información</p>
        </div>
      `)
      .openPopup();

    // Guardar el marcador
    this.markers.push(marker);

    // Centrar el mapa
    this.map.setView([lat, lng], 15);
  }
  scrollToMap(): void {
    if (this.mapSection) {
      this.mapSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
