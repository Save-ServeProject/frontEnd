
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '../../services/articuloService/articulo.service';
import { Articulos } from '../../models/articulos.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-articulos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gestion-articulos.component.html',
  styleUrls: ['./gestion-articulos.component.css']
})
export class GestionArticulosComponent implements OnInit {
  articuloForm: FormGroup;
  imagenSeleccionada: File | null = null;
  articulos: Articulos[] = [];
  modoEdicion = false;
  articuloIdEditando: number | null = null;
  imagenPrevia: string | null = null;


  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService
  ) {
    this.articuloForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      subtitulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.minLength(20)]],
      imagen: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.cargarArticulos();

  }
  cargarArticulos() {
    this.articuloService.getAll().subscribe({
      next: (data) => {
        this.articulos = data;
      },
      error: (error) => {
        console.error('Error al cargar artículos:', error);
        alert('Error al cargar los artículos');
      }
    });
  }

  onImagenSeleccionada(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
      this.articuloForm.patchValue({
        imagen: file
      });
      this.articuloForm.get('imagen')?.markAsTouched();
      // Limpiar imagen previa si existe
      this.imagenPrevia = URL.createObjectURL(file);
  }
  }
  // async guardarArticulo(): Promise<void> {
  //   if (this.articuloForm.valid && (this.imagenSeleccionada || this.modoEdicion)) {
  //     let base64 = '';
      
  //     if (this.imagenSeleccionada) {
  //       base64 = await this.convertirImagenABase64(this.imagenSeleccionada);
  //     }
      
  //     const articulo: Articulos = {
  //       titulo: this.articuloForm.get('titulo')?.value,
  //       subtitulo: this.articuloForm.get('subtitulo')?.value,
  //       contenido: this.articuloForm.get('contenido')?.value,
  //       imagen: base64 || this.articuloForm.get('imagen')?.value
  //     };

  //     if (this.modoEdicion && this.articuloIdEditando) {
  //       // Actualizar artículo existente
  //       articulo.idArticulo = this.articuloIdEditando;
  //       this.articuloService.update(this.articuloIdEditando, articulo).subscribe({
  //         next: () => {
  //           alert('Artículo actualizado correctamente');
  //           this.resetForm();
  //           this.cargarArticulos();
  //         },
  //         error: (error) => {
  //           console.error('Error al actualizar:', error);
  //           alert('Error al actualizar el artículo');
  //         }
  //       });
  //     } else {
  //       // Crear nuevo artículo
  //       this.articuloService.create(articulo).subscribe({
  //         next: () => {
  //           alert('Artículo guardado correctamente');
  //           this.resetForm();
  //           this.cargarArticulos();
  //         },
  //         error: (error) => {
  //           console.error('Error al guardar:', error);
  //           alert('Error al guardar el artículo');
  //         }
  //       });
  //     }
  //   }
  // }
  async guardarArticulo(): Promise<void> {
    if (this.articuloForm.valid && (this.imagenSeleccionada || this.modoEdicion)) {
      let base64 = '';
  
      if (this.imagenSeleccionada) {
        base64 = await this.convertirImagenABase64(this.imagenSeleccionada);
      } else if (this.modoEdicion && this.imagenPrevia) {
        // Si no se seleccionó una nueva imagen en modo edición, se utiliza la imagen previa
        base64 = this.imagenPrevia;
      }
  
      const articulo: Articulos = {
        titulo: this.articuloForm.get('titulo')?.value,
        subtitulo: this.articuloForm.get('subtitulo')?.value,
        contenido: this.articuloForm.get('contenido')?.value,
        imagen: base64 || this.articuloForm.get('imagen')?.value
      };
  
      if (this.modoEdicion && this.articuloIdEditando) {
        // Actualizar artículo existente
        articulo.idArticulo = this.articuloIdEditando;
        this.articuloService.update(this.articuloIdEditando, articulo).subscribe({
          next: () => {
            alert('Artículo actualizado correctamente');
            this.resetForm();
            this.cargarArticulos();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el artículo');
          }
        });
      } else {
        // Crear nuevo artículo
        this.articuloService.create(articulo).subscribe({
          next: () => {
            alert('Artículo guardado correctamente');
            this.resetForm();
            this.cargarArticulos();
          },
          error: (error) => {
            console.error('Error al guardar:', error);
            alert('Error al guardar el artículo');
          }
        });
      }
    }
  }
  
  resetForm() {
    this.articuloForm.reset();
    this.imagenSeleccionada = null;
    this.modoEdicion = false;
    this.articuloIdEditando = null;
  }
  editarArticulo(articulo: Articulos) {
    this.modoEdicion = true;
    this.articuloIdEditando = articulo.idArticulo!;
    this.imagenPrevia = articulo.imagen; // Guardar la imagen actual
    
    // Actualizar el formulario con los datos del artículo
    this.articuloForm.patchValue({
      titulo: articulo.titulo,
      subtitulo: articulo.subtitulo,
      contenido: articulo.contenido,
      imagen: null // Resetear el input de imagen
    });

    // Hacer el campo de imagen opcional en modo edición
    this.articuloForm.get('imagen')?.clearValidators();
    this.articuloForm.get('imagen')?.updateValueAndValidity();
    
    this.imagenSeleccionada = null;
    window.scrollTo(0, 0);
  }

  eliminarArticulo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      this.articuloService.delete(id).subscribe({
        next: () => {
          alert('Artículo eliminado correctamente');
          this.cargarArticulos();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el artículo');
        }
      });
    }
  }
  private convertirImagenABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
