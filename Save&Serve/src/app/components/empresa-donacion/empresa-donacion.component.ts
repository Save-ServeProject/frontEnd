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
  donacionForm: FormGroup;
  totalDonacion: number = 0;

  constructor(
    private empresaService: EmpresaService,
    private donacionService: DonacionService,
    private fb: FormBuilder
  ) {
    this.donacionForm = this.fb.group({
      bancoDeAlimentosId: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      lineasProducto: this.fb.array([]),
      totalDonacion: new FormControl(0)
    });
  }

  ngOnInit() {
    this.loadEmpresa();
    this.loadBancos();
  }

  get lineasProducto() {
    return this.donacionForm.get('lineasProducto') as FormArray;
  }

  loadEmpresa() {
    const empresaId = 1; // Asume que tienes el ID de la empresa actual
    this.empresaService.getEmpresa(empresaId).subscribe(data => {
      this.empresa = data;
    });
  }

  loadBancos() {
    this.donacionService.getBancos().subscribe(data => {
      this.bancos = data;
    });
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
    this.empresaService.updateEmpresa(this.empresa.id, this.empresa).subscribe(
      (updatedEmpresa) => {
        this.empresa = updatedEmpresa;
        this.hasChanges = false;
        // Resetear todos los estados de edición
        Object.keys(this.editing).forEach(key => {
          this.editing[key] = false;
        });
        this.editedFields = {};
        alert('Cambios guardados correctamente');
      },
      error => {
        console.error('Error al actualizar la empresa:', error);
        alert('Error al guardar los cambios');
      }
    );
  }

  addLineaProducto() {
    const lineaProducto = this.fb.group({
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      subtotal: [{value: 0, disabled: true}]
    });

    lineaProducto.get('cantidad')?.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));
    lineaProducto.get('precioUnitario')?.valueChanges.subscribe(() => this.calculateSubtotal(lineaProducto));

    this.lineasProducto.push(lineaProducto);
  }

  removeLineaProducto(index: number) {
    this.lineasProducto.removeAt(index);
    this.calculateTotal();
  }

  calculateSubtotal(lineaProducto: FormGroup) {
    const cantidad = lineaProducto.get('cantidad')?.value || 0;
    const precio = lineaProducto.get('precioUnitario')?.value || 0;
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

  onSubmit() {
    if (this.donacionForm.valid) {
      const donacion = {
        ...this.donacionForm.value,
        empresa: { id: this.empresa.id },
        estadoEnvio: 'PENDIENTE'
      };
      this.donacionService.createDonacion(donacion).subscribe(
        response => {
          console.log('Donación creada:', response);
          // Resetear el formulario
          this.donacionForm.reset();
          this.lineasProducto.clear();
          this.totalDonacion = 0;
          alert('Donación creada con éxito');
        },
        error => {
          console.error('Error al crear la donación:', error);
          alert('Error al crear la donación');
        }
      );
    }
  }
}