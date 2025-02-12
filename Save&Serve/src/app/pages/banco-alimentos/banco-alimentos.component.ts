import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';

@Component({
  selector: 'app-banco-alimentos',
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './banco-alimentos.component.html',
  styleUrl: './banco-alimentos.component.scss'
})
export class BancoAlimentosComponent  {
  bancoAlimentos: any = {};
  editing: {[key: string]: boolean} = {};
  editedFields: { [key: string]: string } = {};
  hasChanges: boolean = false;
  bancoAlimentosForm!: FormGroup;

  bancosAlimentos: any[] = [];
  loadingBancoAlimentos: boolean = false;
  errorBancoAlimentos: string | null = null;

  constructor(private bancoalimentosService: BancoalimentosService) {}

  ngOnInit(): void {
    this.loadBancoAlimentos();
  }

  loadBancoAlimentos(): void {
    this.bancoalimentosService.getById(this.bancoAlimentos.id).subscribe(data => {
      this.bancoAlimentos = data;
    });
  }

  startEditing(field: string): void {
    this.editing[field] = true;
    this.editedFields[field] = this.bancoAlimentos[field];
    this.hasChanges = true;
  }

  cancelEdit(field: string): void {
    this.editing[field] = false;
    this.bancoAlimentos[field] = this.editedFields[field];
    delete this.editedFields[field];
    if (Object.keys(this.editedFields).length === 0) {
      this.hasChanges = false;
    }
  }

  saveChanges() {
    this.bancoalimentosService.updateBancoAlimentos(this.bancoAlimentos.id, this.bancoAlimentos).subscribe({
      next: (updateBancoAlimentos) => {
        this.bancoAlimentos = updateBancoAlimentos;
        this.hasChanges = false;
        Object.keys(this.editing).forEach(key => {
          this.editing[key] = false;
        });
        this.editedFields = {};
        alert('Cambios guardados correctamente');
      },
      error: (error) => {
        console.error('Error al actualizar el banco de alimentos:', error);
        alert('Error al guardar los cambios');
      }
    });
  }
}
