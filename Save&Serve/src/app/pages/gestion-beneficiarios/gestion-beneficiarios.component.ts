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
    documentacionValidada: false, // Validaacin por defecto en falso
    ciudad: '',      
    contrasenia: ''  
  };

  ciudades: string[] = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
    'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao', 
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', "L'Hospitalet de Llobregat", 
    'A Coruña', 'Vitoria-Gasteiz', 'Elche', 'Granada', 'Oviedo', 
    'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 
    'Móstoles', 'Alcalá de Henares', 'Getafe', 'Almería', 'Santander', 
    'Castellón de la Plana', 'Burgos', 'Albacete', 'San Sebastián', 'Logroño', 
    'Cáceres', 'Salamanca', 'Huelva', 'Badajoz', 'Tarragona', 
    'León', 'Lleida', 'Cádiz', 'Jaén', 'Tenerife', 
    'Marbella', 'Fuenlabrada', 'Santa Cruz de Tenerife', 'Mataró', 'Tarragona', 
    'San Cristóbal de La Laguna', 'Reus', 'Pamplona', 'Toledo', 'Girona', 
    'Algeciras', 'Córdoba', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
    'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel', 
    'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'
  ];
  

  ngOnInit(): void {
    this.cargarBeneficiarios();
  }
  cargarBeneficiarios() {
    this.bancoAlimentoService.getAll().subscribe(data => {
      const validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
      
      this.beneficiarios = data.map((beneficiario: any) => ({
        ...beneficiario,
        documentacionValidada: validados[beneficiario.id] === true
      }));
    });
  }

  agregarBeneficiario() {
    if (this.nuevoBeneficiario.nombre && this.nuevoBeneficiario.telefono && this.nuevoBeneficiario.direccion && this.nuevoBeneficiario.email) {
      const estadoValidacion = this.nuevoBeneficiario.documentacionValidada;
      
      this.bancoAlimentoService.create(this.nuevoBeneficiario).subscribe((beneficiarioCreado: any) => {
        if (estadoValidacion) {
          let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
          validados[beneficiarioCreado.id] = true;
          localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
        }
        
        this.cargarBeneficiarios();
        this.nuevoBeneficiario = { 
          nombre: '', 
          telefono: '', 
          direccion: '', 
          email: '', 
          documentacionValidada: false,
          ciudad: '', 
          contrasenia: '' 
        };
      });
    }
  }

  esValidada(beneficiario: any): boolean {
    return beneficiario.documentacionValidada === true;
  }

  toggleValidacion(beneficiario: any) {
    beneficiario.documentacionValidada = !beneficiario.documentacionValidada;
    
    let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
    if (beneficiario.documentacionValidada) {
      validados[beneficiario.id] = true;
    } else {
      delete validados[beneficiario.id];
    }
    
    localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
  }
  

  eliminarBeneficiario(id: number) {
    this.bancoAlimentoService.delete(id).subscribe(() => {
      this.cargarBeneficiarios(); // Recargamos la lista después de eliminar
    });
  }

 
}
