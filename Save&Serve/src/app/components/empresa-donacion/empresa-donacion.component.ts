// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EmpresaService } from '../../services/empresaService/empresa.service';
// import { DonacionService } from '../../services/donacionService/donacion.service';

// @Component({
//   selector: 'app-empresa-donacion',
//   templateUrl: './empresa-donacion.component.html',
//   styleUrls: ['./empresa-donacion.component.scss'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule]
// })
// export class EmpresaDonacionComponent implements OnInit {
//   empresa: any = {};
//   editing: {[key: string]: boolean} = {};
//   editedFields: { [key: string]: string } = {};
//   hasChanges: boolean = false;
//   bancos: any[] = [];
//   donacionForm: FormGroup;
//   totalDonacion: number = 0;

//   constructor(
//     private empresaService: EmpresaService,
//     private donacionService: DonacionService,
//     private fb: FormBuilder
//   ) {
//     this.donacionForm = this.fb.group({
//       bancoDeAlimentosId: ['', Validators.required],
//       fechaEntrega: ['', Validators.required],
//       lineasProducto: this.fb.array([]),
//       totalDonacion: new FormControl(0)
//     });
//   }

//   ngOnInit() {
//     this.loadEmpresa();
//     this.loadBancos();
//   }

//   get lineasProducto() {
//     return this.donacionForm.get('lineasProducto') as FormArray;
//   }

//   loadEmpresa() {
//     const empresaId = 1; // Asume que tienes el ID de la empresa actual
//     this.empresaService.getEmpresa(empresaId).subscribe(data => {
//       this.empresa = data;
//     });
//   }

//   loadBancos() {
//     this.donacionService.getBancos().subscribe(data => {
//       this.bancos = data;
//     });
//   }

//   startEditing(field: string) {
//     this.editing[field] = true;
//     this.editedFields[field] = this.empresa[field];
//     this.hasChanges = true;
//   }

//   cancelEdit(field: string) {
//     this.editing[field] = false;
//     this.empresa[field] = this.editedFields[field];
//     delete this.editedFields[field];
//     if (Object.keys(this.editedFields).length === 0) {
//       this.hasChanges = false;
//     }
//   }

//   saveChanges() {
//     this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe(
//       (updatedEmpresa) => {
//         this.empresa = updatedEmpresa;
//         this.hasChanges = false;
//         // Resetear todos los estados de edición
//         Object.keys(this.editing).forEach(key => {
//           this.editing[key] = false;
//         });
//         this.editedFields = {};
//         alert('Cambios guardados correctamente');
//       },
//       error => {
//         console.error('Error al actualizar la empresa:', error);
//         alert('Error al guardar los cambios');
//       }
//     );
//   }

//   addLineaProducto() {
//     const lineaProducto = this.fb.group({
//       producto: ['', Validators.required],
//       cantidad: [1, [Validators.required, Validators.min(1)]],
//       precioUnitario: [0, [Validators.required, Validators.min(0)]],
//       subtotal: [{value: 0, disabled: true}]
//     });

//     lineaProducto.get('cantidad')?.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
//     lineaProducto.get('precioUnitario')?.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));

//     this.lineasProducto.push(lineaProducto);
//   }

//   removeLineaProducto(index: number) {
//     this.lineasProducto.removeAt(index);
//     this.calculateTotal();
//   }

//   calculateSubtotal(lineaProducto: FormGroup) {
//     const cantidad = lineaProducto.get('cantidad')?.value || 0;
//     const precio = lineaProducto.get('precioUnitario')?.value || 0;
//     lineaProducto.patchValue({
//       subtotal: cantidad * precio
//     }, {emitEvent: false});
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     this.totalDonacion = this.lineasProducto.controls
//       .map(control => control.get('subtotal')?.value || 0)
//       .reduce((acc, current) => acc + current, 0);
//     this.donacionForm.patchValue({
//       totalDonacion: this.totalDonacion
//     }, {emitEvent: false});
//   }

//   onSubmit() {
//     if (this.donacionForm.valid) {
//       const donacion = {
//         ...this.donacionForm.value,
//         empresa: { id: this.empresa.id },
//         estadoEnvio: 'PENDIENTE'
//       };
//       this.donacionService.createDonacion(donacion).subscribe(
//         response => {
//           console.log('Donación creada:', response);
//           // Resetear el formulario
//           this.donacionForm.reset();
//           this.lineasProducto.clear();
//           this.totalDonacion = 0;
//           alert('Donación creada con éxito');
//         },
//         error => {
//           console.error('Error al crear la donación:', error);
//           alert('Error al crear la donación');
//         }
//       );
//     }
//   }
// }

// empresa-donacion.component.ts



// antiguo::

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EmpresaService } from '../../services/empresaService/empresa.service';
// import { DonacionService } from '../../services/donacionService/donacion.service';

// @Component({
//   selector: 'app-empresa-donacion',
//   templateUrl: './empresa-donacion.component.html',
//   styleUrls: ['./empresa-donacion.component.scss'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule]
// })
// export class EmpresaDonacionComponent implements OnInit {
//   empresa: any = {};
//   editing: {[key: string]: boolean} = {};
//   editedFields: { [key: string]: string } = {};
//   hasChanges: boolean = false;
//   bancos: any[] = [];
//   transportes: any[] = [];
//   alergenos: any[] = [];
//   donacionForm!: FormGroup;
//   totalDonacion: number = 0;
//   loadingBancos: boolean = false;
//   loadingTransportes: boolean = false;
//   loadingAlergenos: boolean = false;
//   errorBancos: string | null = null;
//   errorTransportes: string | null = null;
//   errorAlergenos: string | null = null;

//   //añadido para el desplegable que se borrara de empresas
//   empresas: any[] = [];
// loadingEmpresas: boolean = false;
// errorEmpresas: string | null = null;

//   constructor(
//     private empresaService: EmpresaService,
//     private donacionService: DonacionService,
//     private fb: FormBuilder
//   ) {
//     this.donacionForm = this.fb.group({
//       empresaId: ['', Validators.required], //Esto tendra que hacer que coja el del logeado mirar a futuro
//       bancoDeAlimentosId: ['', Validators.required],
//       transporteId: ['', Validators.required],
//       fechaEntrega: ['', Validators.required],
//       lineasProducto: this.fb.array([]),
//       totalDonacion: [0]
//     });
//   }

//   ngOnInit() {
//     this.loadEmpresa();
//     this.loadEmpresas(); //matar a fututuro
//     this.loadBancos();
//     this.loadTransportes();
//     this.loadAlergenos();
//   }

//   //Metodo a matar
//   loadEmpresas() {
//     this.loadingEmpresas = true;
//     this.empresaService.getAll().subscribe({
//       next: (data) => {
//         console.log('Empresas cargadas:', data);
//         this.empresas = data;
//         this.loadingEmpresas = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar empresas:', error);
//         this.errorEmpresas = 'Error al cargar las empresas';
//         this.loadingEmpresas = false;
//       }
//     });
//   }
// //hasta aquui


//   get lineasProducto() {
//     return this.donacionForm.get('lineasProducto') as FormArray;
//   }

//   loadEmpresa() {
//     const empresaId = 1;
//     this.empresaService.getEmpresa(empresaId).subscribe({
//       next: (data) => {
//         console.log('Empresa cargada:', data);
//         this.empresa = data;
//       },
//       error: (error) => {
//         console.error('Error al cargar empresa:', error);
//         alert('Error al cargar la información de la empresa');
//       }
//     });
//   }

//   loadBancos() {
//     this.loadingBancos = true;
//     this.errorBancos = null;
    
//     this.donacionService.getBancos().subscribe({
//       next: (data) => {
//         console.log('Bancos cargados:', data);
//         this.bancos = data;
//         this.loadingBancos = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar bancos:', error);
//         this.errorBancos = 'Error al cargar los bancos de alimentos';
//         this.loadingBancos = false;
//         this.bancos = [];
//       }
//     });
//   }

//   loadTransportes() {
//     this.loadingTransportes = true;
//     this.donacionService.getTransportes().subscribe({
//       next: (data) => {
//         this.transportes = data;
//         this.loadingTransportes = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar transportes:', error);
//         this.errorTransportes = 'Error al cargar los transportes';
//         this.loadingTransportes = false;
//       }
//     });
//   }

//   loadAlergenos() {
//     this.loadingAlergenos = true;
//     this.donacionService.getAlergenos().subscribe({
//       next: (data) => {
//         this.alergenos = data;
//         this.loadingAlergenos = false;
//       },
//       error: (error) => {
//         console.error('Error al cargar alérgenos:', error);
//         this.errorAlergenos = 'Error al cargar los alérgenos';
//         this.loadingAlergenos = false;
//       }
//     });
//   }

//   startEditing(field: string) {
//     this.editing[field] = true;
//     this.editedFields[field] = this.empresa[field];
//     this.hasChanges = true;
//   }

//   cancelEdit(field: string) {
//     this.editing[field] = false;
//     this.empresa[field] = this.editedFields[field];
//     delete this.editedFields[field];
//     if (Object.keys(this.editedFields).length === 0) {
//       this.hasChanges = false;
//     }
//   }

//   saveChanges() {
//     this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe({
//       next: (updatedEmpresa) => {
//         this.empresa = updatedEmpresa;
//         this.hasChanges = false;
//         Object.keys(this.editing).forEach(key => {
//           this.editing[key] = false;
//         });
//         this.editedFields = {};
//         alert('Cambios guardados correctamente');
//       },
//       error: (error) => {
//         console.error('Error al actualizar la empresa:', error);
//         alert('Error al guardar los cambios');
//       }
//     });
//   }

//   addLineaProducto() {
//     const lineaProducto = this.fb.group({
//       producto: ['', Validators.required],
//       cantidad: [1, [Validators.required, Validators.min(1)]],
//       precioUnitario: [0, [Validators.required, Validators.min(0)]],
//       subtotal: [{value: 0, disabled: true}],
//       tipoProducto: ['', Validators.required],
//       alergenos: this.fb.array([])
//     });

//     const alergenosArray = lineaProducto.get('alergenos') as FormArray;
//     this.alergenos.forEach(() => {
//       alergenosArray.push(this.fb.control(false));
//     });

//     this.setupLineaProductoListeners(lineaProducto);
//     this.lineasProducto.push(lineaProducto);
//   }

//   private setupLineaProductoListeners(lineaProducto: FormGroup) {
//     const cantidad = lineaProducto.get('cantidad');
//     const precioUnitario = lineaProducto.get('precioUnitario');

//     if (cantidad && precioUnitario) {
//       cantidad.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
//       precioUnitario.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
//     }
//   }

//   removeLineaProducto(index: number) {
//     this.lineasProducto.removeAt(index);
//     this.calculateTotal();
//   }

//   calculateSubtotal(lineaProducto: FormGroup) {
//     const cantidad = lineaProducto.get('cantidad')?.value || 0;
//     const precio = lineaProducto.get('precioUnitario')?.value || 0;
//     lineaProducto.patchValue({
//       subtotal: cantidad * precio
//     }, {emitEvent: false});
//     this.calculateTotal();
//   }

//   calculateTotal() {
//     this.totalDonacion = this.lineasProducto.controls
//       .map(control => control.get('subtotal')?.value || 0)
//       .reduce((acc, current) => acc + current, 0);
//     this.donacionForm.patchValue({
//       totalDonacion: this.totalDonacion
//     }, {emitEvent: false});
//   }

//   // onSubmit() {
//   //   if (this.donacionForm.valid) {
//   //     const donacion = {
//   //       ...this.donacionForm.value,
//   //       // empresa: { id: this.empresa.id },   Este es el antiguo
//   //       empresa: { id: this.donacionForm.value.empresaId }, //Este es el nuevo
//   //       estadoEnvio: 'PENDIENTE',
//   //       transporte: { id: this.donacionForm.value.transporteId },
//   //       lineasProducto: this.donacionForm.value.lineasProducto.map((linea: any) => ({
//   //         ...linea,
//   //         alergenos: linea.alergenos
//   //           .map((checked: boolean, index: number) => checked ? this.alergenos[index].id : null)
//   //           .filter((id: number | null) => id !== null)
//   //       }))
//   //     };

//   //     this.donacionService.createDonacion(donacion).subscribe({
//   //       next: (response) => {
//   //         console.log('Donación creada:', response);
//   //         this.donacionForm.reset();
//   //         this.lineasProducto.clear();
//   //         this.totalDonacion = 0;
//   //         alert('Donación creada con éxito');
//   //       },
//   //       error: (error) => {
//   //         console.error('Error al crear la donación:', error);
//   //         alert('Error al crear la donación');
//   //       }
//   //     });
//   //   }
//   // }


//   onSubmit() {
//     if (this.donacionForm.valid) {
//       const lineasProductoValue = this.donacionForm.value.lineasProducto.map((linea: any) => {
//         const producto = {
//           nombre: linea.producto.nombre,
//           idProducto: this.generateProductId(linea.producto.nombre), // Función para generar ID único
//           precio: linea.precioUnitario,
//           tipoProducto: linea.producto.tipoProducto,
//           tipoTransporte: linea.producto.tipoTransporte,
//           alergenos: linea.alergenos
//             .map((checked: boolean, index: number) => checked ? this.alergenos[index].id : null)
//             .filter((id: any) => id !== null)
//         };
  
//         return {
//           producto: producto,
//           cantidad: linea.cantidad,
//           precioUnitario: linea.precioUnitario,
//           subtotal: linea.cantidad * linea.precioUnitario
//         };
//       });
  
//       const donacion = {
//         fechaEntrega: this.donacionForm.value.fechaEntrega,
//         empresa: { id: this.donacionForm.value.empresaId },
//         bancoDeAlimentos: { id: this.donacionForm.value.bancoDeAlimentosId },
//         transporte: { id: this.donacionForm.value.transporteId },
//         estadoEnvio: 'PENDIENTE',
//         lineasProducto: lineasProductoValue
//       };
  
//       this.donacionService.createDonacion(donacion).subscribe({
//         next: (response) => {
//           console.log('Donación creada:', response);
//           this.donacionForm.reset();
//           this.lineasProducto.clear();
//           this.totalDonacion = 0;
//           alert('Donación creada con éxito');
//         },
//         error: (error) => {
//           console.error('Error al crear la donación:', error);
//           alert('Error al crear la donación');
//         }
//       });
//     }
//   }
  
//   private generateProductId(nombre: string): string {
//     // Genera un ID basado en el nombre del producto y un timestamp
//     const timestamp = new Date().getTime();
//     const nombreNormalizado = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
//     return `PRD-${nombreNormalizado.substring(0, 5)}-${timestamp}`;
//   }
// }


////////////segundo untento

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresaService/empresa.service';
import { DonacionService } from '../../services/donacionService/donacion.service';

@Component({
  selector: 'app-empresa-donacion',
  templateUrl: './empresa-donacion.component.html',
  styleUrls: ['./empresa-donacion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EmpresaDonacionComponent implements OnInit {
  empresa: any = {};
  editing: {[key: string]: boolean} = {};
  editedFields: { [key: string]: string } = {};
  hasChanges: boolean = false;
  bancos: any[] = [];
  transportes: any[] = [];
  alergenos: any[] = [];
  donacionForm!: FormGroup;
  totalDonacion: number = 0;
  loadingBancos: boolean = false;
  loadingTransportes: boolean = false;
  loadingAlergenos: boolean = false;
  errorBancos: string | null = null;
  errorTransportes: string | null = null;
  errorAlergenos: string | null = null;

  // Temporal hasta implementar login
  empresas: any[] = [];
  loadingEmpresas: boolean = false;
  errorEmpresas: string | null = null;

  constructor(
    private empresaService: EmpresaService,
    private donacionService: DonacionService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.donacionForm = this.fb.group({
      empresaId: ['', Validators.required],
      bancoDeAlimentosId: ['', Validators.required],
      transporteId: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      lineasProducto: this.fb.array([]),
      totalDonacion: [0]
    });
  }

  ngOnInit() {
    this.loadEmpresa();
    this.loadEmpresas();
    this.loadBancos();
    this.loadTransportes();
    this.loadAlergenos();
  }

  get lineasProducto() {
    return this.donacionForm.get('lineasProducto') as FormArray;
  }

  loadEmpresa() {
    const empresaId = 1;
    this.empresaService.getEmpresa(empresaId).subscribe({
      next: (data) => {
        console.log('Empresa cargada:', data);
        this.empresa = data;
      },
      error: (error) => {
        console.error('Error al cargar empresa:', error);
        alert('Error al cargar la información de la empresa');
      }
    });
  }

  loadEmpresas() {
    this.loadingEmpresas = true;
    this.empresaService.getAll().subscribe({
      next: (data) => {
        this.empresas = data;
        this.loadingEmpresas = false;
      },
      error: (error) => {
        console.error('Error al cargar empresas:', error);
        this.errorEmpresas = 'Error al cargar las empresas';
        this.loadingEmpresas = false;
      }
    });
  }

  loadBancos() {
    this.loadingBancos = true;
    this.donacionService.getBancos().subscribe({
      next: (data) => {
        this.bancos = data;
        this.loadingBancos = false;
      },
      error: (error) => {
        this.errorBancos = 'Error al cargar los bancos de alimentos';
        this.loadingBancos = false;
      }
    });
  }

  loadTransportes() {
    this.loadingTransportes = true;
    this.donacionService.getTransportes().subscribe({
      next: (data) => {
        this.transportes = data;
        this.loadingTransportes = false;
      },
      error: (error) => {
        this.errorTransportes = 'Error al cargar los transportes';
        this.loadingTransportes = false;
      }
    });
  }

  loadAlergenos() {
    this.loadingAlergenos = true;
    this.donacionService.getAlergenos().subscribe({
      next: (data) => {
        this.alergenos = data;
        this.loadingAlergenos = false;
      },
      error: (error) => {
        this.errorAlergenos = 'Error al cargar los alérgenos';
        this.loadingAlergenos = false;
      }
    });
  }

  addLineaProducto() {
    const lineaProducto = this.fb.group({
      producto: this.fb.group({
        nombre: ['', Validators.required],
        precio: [0, [Validators.required, Validators.min(0)]],
        tipoProducto: ['', Validators.required],
        tipoTransporte: ['', Validators.required]
      }),
      cantidad: [1, [Validators.required, Validators.min(1)]],
      subtotal: [{value: 0, disabled: true}],
      alergenos: this.fb.array([])
    });

    const alergenosArray = lineaProducto.get('alergenos') as FormArray;
    this.alergenos.forEach(() => {
      alergenosArray.push(this.fb.control(false));
    });

    // Configurar los listeners para el cálculo automático
    const cantidad = lineaProducto.get('cantidad');
    const precio = lineaProducto.get('producto.precio');

    if (cantidad && precio) {
      cantidad.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
      precio.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
    }

    this.lineasProducto.push(lineaProducto);
  }

  removeLineaProducto(index: number) {
    this.lineasProducto.removeAt(index);
    this.calculateTotal();
  }

  calculateSubtotal(lineaProducto: FormGroup) {
    const cantidad = lineaProducto.get('cantidad')?.value || 0;
    const precio = lineaProducto.get('producto.precio')?.value || 0;
    lineaProducto.patchValue({
      subtotal: cantidad * precio
    }, {emitEvent: false});
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalDonacion = this.lineasProducto.controls
      .map(control => control.get('subtotal')?.value || 0)
      .reduce((acc, current) => acc + current, 0);
    this.donacionForm.patchValue({
      totalDonacion: this.totalDonacion
    }, {emitEvent: false});
  }

  private generateProductId(nombre: string): string {
    const timestamp = new Date().getTime();
    const nombreNormalizado = nombre.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `PRD-${nombreNormalizado.substring(0, 5)}-${timestamp}`;
  }

  startEditing(field: string) {
    this.editing[field] = true;
    this.editedFields[field] = this.empresa[field];
    this.hasChanges = true;
  }

  cancelEdit(field: string) {
    this.editing[field] = false;
    this.empresa[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }

  saveChanges() {
    this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe({
      next: (updatedEmpresa) => {
        this.empresa = updatedEmpresa;
        this.hasChanges = false;
        Object.keys(this.editing).forEach(key => {
          this.editing[key] = false;
        });
        this.editedFields = {};
        alert('Cambios guardados correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar la empresa:', error);
        alert('Error al guardar los cambios');
      }
    });
  }

  onSubmit() {
    if (this.donacionForm.valid) {
      const lineasProductoValue = this.donacionForm.value.lineasProducto.map((linea: any) => {
        const productoForm = linea.producto;
        const producto = {
          nombre: productoForm.nombre,
          idProducto: this.generateProductId(productoForm.nombre),
          precio: productoForm.precio,
          tipoProducto: productoForm.tipoProducto,
          tipoTransporte: productoForm.tipoTransporte
        };

        return {
          producto: producto,
          cantidad: linea.cantidad,
          precioUnitario: producto.precio,
          subtotal: linea.cantidad * producto.precio,
          alergenos: linea.alergenos
            .map((checked: boolean, index: number) => checked ? this.alergenos[index].id : null)
            .filter((id: any) => id !== null)
        };
      });

      const donacion = {
        fechaEntrega: this.donacionForm.value.fechaEntrega,
        empresa: { id: this.donacionForm.value.empresaId },
        bancoDeAlimentos: { id: this.donacionForm.value.bancoDeAlimentosId },
        transporte: { id: this.donacionForm.value.transporteId },
        estadoEnvio: 'PENDIENTE',
        lineasProducto: lineasProductoValue,
        totalDonacion: this.totalDonacion
      };

      this.donacionService.createDonacion(donacion).subscribe({
        next: (response) => {
          console.log('Donación creada:', response);
          this.donacionForm.reset();
          this.lineasProducto.clear();
          this.totalDonacion = 0;
          alert('Donación creada con éxito');
        },
        error: (error) => {
          console.error('Error al crear la donación:', error);
          alert('Error al crear la donación: ' + error.message);
        }
      });
    }
  }
}