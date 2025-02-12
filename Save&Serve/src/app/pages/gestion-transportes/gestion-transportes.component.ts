import { Component, OnInit } from '@angular/core';
import { TransporteService } from '../../services/transporteService/transporte.service';
import { Donacion, EstadoEnvio } from '../../models/donacion.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-transportes',
  imports: [ RouterModule, CommonModule],
  templateUrl: './gestion-transportes.component.html',
  styleUrls: ['./gestion-transportes.component.scss']
})
export class GestionTransportesComponent implements OnInit {
  transportes: any[] = []; // Asumiendo que ya tienes transportes cargados
  donaciones: Donacion[] = [];
  transporteSeleccionado: number | null = null;
  EstadoEnvio = EstadoEnvio;
  constructor(private transporteService: TransporteService) {}

  ngOnInit(): void {
    // Lógica para cargar los transportes
    // Llamada a cargar los transportes si no están cargados
  }

  // Cargar las donaciones para un transporte específico
  cargarDonaciones(transporteId: number): void {
    this.transporteService.getDonacionesByTransporte(transporteId).subscribe((data) => {
      this.donaciones = data;
    });
  }

  // Cambiar el estado de una donación
  cambiarEstadoDonacion(idDonacion: number | undefined, estado: EstadoEnvio): void {
    if (idDonacion !== undefined) {
      // Lógica para cambiar el estado
      console.log(`Cambiando estado de la donación con ID ${idDonacion} a ${estado}`);
      // Aquí agregarías la lógica para actualizar el estado de la donación en tu backend o en tu array
    } else {
      console.error('ID de donación no válido');
    }
  }

  // Mostrar las donaciones de un transporte
  seleccionarTransporte(transporteId: number): void {
    this.transporteSeleccionado = transporteId;
    this.cargarDonaciones(transporteId);
  }
}
