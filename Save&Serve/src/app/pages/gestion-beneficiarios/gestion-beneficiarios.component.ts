import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-beneficiarios',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './gestion-beneficiarios.component.html',
  styleUrl: './gestion-beneficiarios.component.scss'
})
export class GestionBeneficiariosComponent implements OnInit {
  constructor(private bancoAlimentoService: BancoalimentosService) { }

  beneficiarios: any[] = [];
  nuevoBeneficiario = { 
    nombre: '', 
    telefono: '', 
    direccion: '', 
    email: '', 
    documentacionValidada: false, // Estado de validación por defecto
    ciudad: '',      
    contrasenia: ''  
  };

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }

  cargarBeneficiarios() {
    this.bancoAlimentoService.getAll().subscribe(data => {
      this.beneficiarios = data;
    });
  }

  agregarBeneficiario() {
    // Si los campos requeridos están llenos, agregar el beneficiario
    if (this.nuevoBeneficiario.nombre && this.nuevoBeneficiario.telefono && this.nuevoBeneficiario.direccion && this.nuevoBeneficiario.email) {
      // Llamamos al servicio para crear un nuevo beneficiario
      this.bancoAlimentoService.create(this.nuevoBeneficiario).subscribe(() => {
        this.cargarBeneficiarios(); // Recargamos la lista de beneficiarios
        // Resetear el formulario
        this.nuevoBeneficiario = { nombre: '', telefono: '', direccion: '', email: '', documentacionValidada: false, ciudad: '', contrasenia: '' };
      });
    }
  }

  eliminarBeneficiario(id: number) {
    this.bancoAlimentoService.delete(id).subscribe(() => {
      this.cargarBeneficiarios(); // Recargamos la lista después de eliminar
    });
  }

  esValidada(beneficiario: any): boolean {
    // Verifica si el beneficiario ha sido validado (usando el localStorage para el estado de validación)
    const validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
    return validados[beneficiario.id] || false;
  }

  toggleValidacion(beneficiario: any) {
    let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');

    // Alternar el estado de validación
    if (validados[beneficiario.id]) {
      delete validados[beneficiario.id];
    } else {
      validados[beneficiario.id] = true;
    }

    localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
  }
}
