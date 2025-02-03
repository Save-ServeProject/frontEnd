// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-haztevoluntario',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './haztevoluntario.component.html',
//   styleUrl: './haztevoluntario.component.scss'
// })
// export class HaztevoluntarioComponent implements OnInit {
//   private map: L.Map | null = null;
//   private marker: L.Marker | null = null;

//   constructor() { }

//   ngOnInit(): void {
//     // Cargar los estilos de Leaflet
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     // Inicializar el mapa después de un pequeño delay para asegurar que el DOM está listo
//     setTimeout(() => {
//       this.initMap();
//     }, 100);
//   }

//   private initMap(): void {
//     // Inicializar el mapa en Madrid
//     this.map = L.map('mapa').setView([40.4168, -3.7038], 6);

//     // Añadir la capa de OpenStreetMap
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);
//   }

//   mostrarUbicacion(lat: number, lng: number, titulo: string): void {
//     if (!this.map) {
//       setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
//       return;
//     }

//     // Si ya existe un marcador, lo eliminamos
//     if (this.marker) {
//       this.marker.remove();
//     }

//     // Crear nuevo marcador
//     this.marker = L.marker([lat, lng])
//       .addTo(this.map)
//       .bindPopup(`<div class="popup-content">
//         <h6>${titulo}</h6>
//         <p>Haz click para más información</p>
//       </div>`)
//       .openPopup();

//     // Centrar el mapa en la ubicación
//     this.map.setView([lat, lng], 15);
//   }
// }

//Lo aniguo furulaba

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { GeocodingService } from '../../services/geocoding.service';
// import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
// import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-haztevoluntario',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './haztevoluntario.component.html',
//   styleUrl: './haztevoluntario.component.scss'
// })
// export class HaztevoluntarioComponent implements OnInit {
//   private map: L.Map | null = null;
//   private marker: L.Marker | null = null;
//   bancos: BancoDeAlimentos[] = [];

//   constructor(
//     private geocodingService: GeocodingService,
//     private bancoService: BancoalimentosService
//   ) { }

//   ngOnInit(): void {
//     this.initMap();
//     this.cargarBancos();
//   }

//   private initMap(): void {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     setTimeout(() => {
//       this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(this.map);
//     }, 100);
//   }

//   private cargarBancos(): void {
//     this.bancoService.getAll().subscribe({
//       next: (bancos) => {
//         this.bancos = bancos;
//         bancos.forEach(banco => {
//           this.obtenerCoordenadas(banco.direccion, banco.ciudad, banco.nombre);
//         });
//       },
//       error: (error) => console.error('Error al cargar bancos:', error)
//     });
//   }

//   obtenerCoordenadas(direccion: string, ciudad: string, nombre: string): void {
//     this.geocodingService.obtenerCoordenadas(direccion, ciudad).subscribe({
//       next: (coordenadas) => {
//         if (coordenadas) {
//           this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, nombre);
//         }
//       },
//       error: (error) => console.error('Error al obtener coordenadas:', error)
//     });
//   }

//   mostrarUbicacion(lat: number, lng: number, titulo: string): void {
//     if (!this.map) {
//       setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
//       return;
//     }

//     if (this.marker) {
//       this.map.removeLayer(this.marker);
//     }

//     this.marker = L.marker([lat, lng])
//       .addTo(this.map)
//       .bindPopup(`
//         <div class="popup-content">
//           <h6>${titulo}</h6>
//           <p>Haz click para más información</p>
//         </div>
//       `)
//       .openPopup();

//     this.map.setView([lat, lng], 15);
//   }
// }

//Esto es a partir de que se genere con la base de datos:

// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { GeocodingService } from '../../services/geocoding.service';
// import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
// import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';
// import * as L from 'leaflet';

// @Component({
//   selector: 'app-haztevoluntario',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './haztevoluntario.component.html',
//   styleUrl: './haztevoluntario.component.scss'
// })
// export class HaztevoluntarioComponent implements OnInit {
//   private map: L.Map | null = null;
//   private markers: L.Marker[] = [];
//   bancos: BancoDeAlimentos[] = [];

//   constructor(
//     private geocodingService: GeocodingService,
//     private bancoService: BancoalimentosService
//   ) { }

//   ngOnInit(): void {
//     this.initMap();
//     this.cargarBancos();
//   }

//   private initMap(): void {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
//     document.head.appendChild(link);

//     setTimeout(() => {
//       this.map = L.map('mapa').setView([40.4168, -3.7038], 6);
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '© OpenStreetMap contributors'
//       }).addTo(this.map);
//     }, 100);
//   }

//   private cargarBancos(): void {
//     this.bancoService.getAll().subscribe({
//       next: (bancos) => {
//         this.bancos = bancos;
//       },
//       error: (error) => {
//         console.error('Error al cargar bancos de alimentos:', error);
//       }
//     });
//   }

//   obtenerYMostrarUbicacion(banco: BancoDeAlimentos): void {
//     this.geocodingService.obtenerCoordenadas(banco.direccion, banco.ciudad).subscribe({
//       next: (coordenadas) => {
//         if (coordenadas) {
//           this.mostrarUbicacion(coordenadas.lat, coordenadas.lng, banco.nombre);
//         } else {
//           console.error('No se pudieron obtener las coordenadas para:', banco.nombre);
//         }
//       },
//       error: (error) => {
//         console.error('Error al obtener coordenadas:', error);
//       }
//     });
//   }

//   mostrarUbicacion(lat: number, lng: number, titulo: string): void {
//     if (!this.map) {
//       setTimeout(() => this.mostrarUbicacion(lat, lng, titulo), 100);
//       return;
//     }

//     // Crear nuevo marcador
//     const marker = L.marker([lat, lng])
//       .addTo(this.map)
//       .bindPopup(`
//         <div class="popup-content">
//           <h6>${titulo}</h6>
//           <p>Haz click para más información</p>
//         </div>
//       `)
//       .openPopup();

//     // Guardar el marcador en el array
//     this.markers.push(marker);

//     // Centrar el mapa en la ubicación
//     this.map.setView([lat, lng], 15);
//   }
// }

//Segundo intento

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
}