// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

// @Component({
//   selector: 'app-gestion-beneficiarios',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './gestion-beneficiarios.component.html',
//   styleUrl: './gestion-beneficiarios.component.scss'
// })
// export class GestionBeneficiariosComponent implements OnInit {
 
//   modoEdicion = false;
//   mensaje: string = '';
//   beneficiarios: BancoDeAlimentos[] = [];
//   beneficiarioForm: FormGroup | undefined;
//   beneficiarioIdEdicion?: number;
//   nuevoBeneficiario = { 
//     id: null,
//     nombre: '', 
//     telefono: '', 
//     direccion: '', 
//     email: '', 
//     documentacionValidada: false, // Validaacin por defecto en falso
//     ciudad: '',      
//     contrasenia: ''  
//   };
//   constructor(private bancoAlimentoService: BancoalimentosService, private fb: FormBuilder) { 
//     this.beneficiarioForm = this.fb.group({
//           nombre: ['', [Validators.required, Validators.minLength(3)]],
//           telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]],
//           direccion: ['', Validators.required],
//           email: ['', [Validators.required, Validators.email]],
//           ciudad: ['', Validators.required],
          
//           documentacionValidada: [false],
     
//           contrasenia: ['', [Validators.required, Validators.minLength(6)]]
//         });
//   }
//   ciudades: string[] = [
//     'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
//     'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao', 
//     'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', "L'Hospitalet de Llobregat", 
//     'A Coruña', 'Vitoria-Gasteiz', 'Elche', 'Granada', 'Oviedo', 
//     'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 
//     'Móstoles', 'Alcalá de Henares', 'Getafe', 'Almería', 'Santander', 
//     'Castellón de la Plana', 'Burgos', 'Albacete', 'San Sebastián', 'Logroño', 
//     'Cáceres', 'Salamanca', 'Huelva', 'Badajoz', 'Tarragona', 
//     'León', 'Lleida', 'Cádiz', 'Jaén', 'Tenerife', 
//     'Marbella', 'Fuenlabrada', 'Santa Cruz de Tenerife', 'Mataró', 'Tarragona', 
//     'San Cristóbal de La Laguna', 'Reus', 'Pamplona', 'Toledo', 'Girona', 
//     'Algeciras', 'Córdoba', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
//     'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel', 
//     'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'
//   ];
  

//   ngOnInit(): void {
//     this.cargarBeneficiarios();
//   }
//   cargarBeneficiarios() {
//     this.bancoAlimentoService.getAll().subscribe(data => {
//       const validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
      
//       this.beneficiarios = data.map((beneficiario: any) => ({
//         ...beneficiario,
//         documentacionValidada: validados[beneficiario.id] === true
//       }));
//     });
//   }

//   // agregarBeneficiario() {
//   //   if (this.nuevoBeneficiario.nombre && this.nuevoBeneficiario.telefono && this.nuevoBeneficiario.direccion && this.nuevoBeneficiario.email) {
//   //     const estadoValidacion = this.nuevoBeneficiario.documentacionValidada;
      
//   //     this.bancoAlimentoService.create(this.nuevoBeneficiario).subscribe((beneficiarioCreado: any) => {
//   //       if (estadoValidacion) {
//   //         let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
//   //         validados[beneficiarioCreado.id] = true;
//   //         localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
//   //       }
        
//   //       this.cargarBeneficiarios();
//   //       this.nuevoBeneficiario = { 
//   //         id: null,
//   //         nombre: '', 
//   //         telefono: '', 
//   //         direccion: '', 
//   //         email: '', 
//   //         documentacionValidada: false,
//   //         ciudad: '', 
//   //         contrasenia: '' 
//   //       };
//   //     });
//   //   }
//   // }

//   // agregarBeneficiario() {
    
//   //     if (!this.beneficiarioForm || this.beneficiarioForm.invalid) return;
  
//   //     const beneficiarioParaEnviar = { ...this.beneficiarioForm.value };
  
//   //     if (this.modoEdicion && this.beneficiarioIdEdicion) {
//   //       this.bancoAlimentoService.update(this.beneficiarioIdEdicion, beneficiarioParaEnviar).subscribe(() => {
//   //         this.cargarBeneficiarios();
//   //         this.limpiarFormulario();
//   //         this.mensaje = 'Modificación realizada con éxito';
//   //         setTimeout(() => (this.mensaje = ''), 3000);
//   //       });
//   //     } else {
//   //       this.bancoAlimentoService.create(beneficiarioParaEnviar).subscribe(() => {
//   //         this.cargarBeneficiarios();
//   //         this.limpiarFormulario();
//   //       });
//   //     }
//   //   }

//   agregarBeneficiario() {
//     if (!this.beneficiarioForm || this.beneficiarioForm.invalid) return;
  
//     const beneficiarioParaEnviar = { ...this.beneficiarioForm.value };
  
//     if (this.modoEdicion && this.beneficiarioIdEdicion) {
//       // Si estamos en modo edición, actualizamos el beneficiario
//       this.bancoAlimentoService.update(this.beneficiarioIdEdicion, beneficiarioParaEnviar).subscribe(() => {
//         this.cargarBeneficiarios();
//         this.limpiarFormulario(); // Limpiamos el formulario después de editar
//         this.modoEdicion = false; // Salimos del modo edición
//         this.mensaje = 'Modificación realizada con éxito';
//         setTimeout(() => (this.mensaje = ''), 3000);
//       });
//     } else {
//       // Si estamos agregando un nuevo beneficiario
//       this.bancoAlimentoService.create(beneficiarioParaEnviar).subscribe(() => {
//         this.cargarBeneficiarios();
//         this.limpiarFormulario();
//       });
//     }
//   }
  
  
  
  

// //  limpiarFormulario() {
// //      if (!this.beneficiarioForm) return;
// //      this.beneficiarioForm.reset({
// //        nombre: '',
// //        telefono: '',
// //        direccion: '',
// //        email: '',
// //        ciudad: '',
// //        documentacionValidada: false,
   
// //        contrasenia: ''
// //      });
// //      this.beneficiarioIdEdicion = undefined;
// //      this.modoEdicion = false;
// //    }
  
// limpiarFormulario() {
//   if (!this.beneficiarioForm) return;
//   this.beneficiarioForm.reset({
//     nombre: '',
//     telefono: '',
//     direccion: '',
//     email: '',
//     ciudad: '',
//     documentacionValidada: false,
//     contrasenia: ''
//   });
//   this.beneficiarioIdEdicion = undefined;
//   this.modoEdicion = false;  // Asegura salir del modo edición
// }


//   esValidada(beneficiario: any): boolean {
//     return beneficiario.documentacionValidada === true;
//   }

//   toggleValidacion(beneficiario: any) {
//     beneficiario.documentacionValidada = !beneficiario.documentacionValidada;
    
//     let validados = JSON.parse(localStorage.getItem('beneficiariosValidados') || '{}');
//     if (beneficiario.documentacionValidada) {
//       validados[beneficiario.id] = true;
//     } else {
//       delete validados[beneficiario.id];
//     }
    
//     localStorage.setItem('beneficiariosValidados', JSON.stringify(validados));
//   }
  

//   eliminarBeneficiario(id: number) {
//     if (id !== undefined) {
//       this.bancoAlimentoService.delete(id).subscribe(() => {
//         this.cargarBeneficiarios(); // Recargamos la lista después de eliminar
//       });
//     }
//   }
  

//   editarBeneficiario(beneficiario: BancoDeAlimentos) {
//     this.beneficiarioIdEdicion = beneficiario.id; // Asegúrate de que el ID está siendo asignado correctamente.
//     this.modoEdicion = true; // Establece el modo de edición como verdadero
  
//     if (this.beneficiarioForm) {
//       // Usamos patchValue para cargar los datos del beneficiario en el formulario.
//       this.beneficiarioForm.patchValue({
//         nombre: beneficiario.nombre,
//         telefono: beneficiario.telefono,
//         direccion: beneficiario.direccion,
//         email: beneficiario.email,
//         ciudad: beneficiario.ciudad,
//         documentacionValidada: beneficiario.documentacionValidada,
//         contrasenia: ''  // No llenamos la contraseña por seguridad
//       });
//     }
//   }
  

// }
