// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-donacion',
//   imports: [],
//   templateUrl: './donacion.component.html',
//   styleUrl: './donacion.component.scss'
// })
// export class DonacionComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionService } from '../../services/donacionService/donacion.service';
import { AuthService } from '../../services/autentificacion/auth.service';
import { EmpresaService } from '../../services/empresaService/empresa.service';

@Component({
  selector: 'app-donacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donacion.component.html',
  styleUrl: './donacion.component.scss'
})
export class DonacionComponent implements OnInit {
  donaciones: any[] = [];
  empresa: any = {};
  loadingDonaciones: boolean = false;
  errorDonaciones: string | null = null;

  constructor(
    private donacionService: DonacionService,
    private empresaService: EmpresaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentEmpresa();
  }

  loadCurrentEmpresa() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.email) {
      this.empresaService.getEmpresaByEmail(userData.email).subscribe({
        next: (data) => {
          this.empresa = data;
          this.loadDonacionesEmpresa(data.id);
        },
        error: (error) => {
          console.error('Error al cargar empresa:', error);
        }
      });
    }
  }

  loadDonacionesEmpresa(empresaId: number) {
    this.loadingDonaciones = true;
    this.donacionService.getDonacionesByEmpresa(empresaId).subscribe({
      next: (data) => {
        this.donaciones = data;
        this.loadingDonaciones = false;
      },
      error: (error) => {
        console.error('Error al cargar donaciones:', error);
        this.errorDonaciones = 'Error al cargar las donaciones';
        this.loadingDonaciones = false;
      }
    });
  }

  verDetalleDonacion(donacion: any) {
    // Implementar lógica para mostrar detalles de la donación
    console.log('Detalle de donación:', donacion);
  }
}