// // import { CommonModule } from '@angular/common';
// // import { Component } from '@angular/core';
// // import { RouterModule } from '@angular/router';

// // @Component({
// //   selector: 'app-gestion-articulos',
// //   standalone: true,
// //   imports: [RouterModule, CommonModule],
// //   templateUrl: './gestion-articulos.component.html',
// //   styleUrl: './gestion-articulos.component.scss'
// // })
// // export class GestionArticulosComponent {

// // }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ArticuloService } from '../../services/articuloService/articulo.service';
// import { Articulos } from '../../models/articulos.model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-gestion-articulos',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './gestion-articulos.component.html',
//   styleUrls: ['./gestion-articulos.component.css']
// })
// export class GestionArticulosComponent implements OnInit {
//   articuloForm: FormGroup;
//   imagenSeleccionada: File | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private articuloService: ArticuloService
//   ) {
//     this.articuloForm = this.fb.group({
//       titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
//       subtitulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
//       contenido: ['', [Validators.required, Validators.minLength(20)]],
//       imagen: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {}

//   onImagenSeleccionada(event: any): void {
//     const file = event.target.files[0];
//     this.imagenSeleccionada = file;
  
//     // Actualizar el valor de la imagen en el formulario
//     this.articuloForm.patchValue({
//       imagen: file
//     });
//   }

//   async guardarArticulo(): Promise<void> {
//     if (this.articuloForm.valid && this.imagenSeleccionada) {
//       // Convertir la imagen a Base64
//       const base64 = await this.convertirImagenABase64(this.imagenSeleccionada);
      
//       const articulo: Articulos = {
//         titulo: this.articuloForm.get('titulo')?.value,
//         subtitulo: this.articuloForm.get('subtitulo')?.value,
//         contenido: this.articuloForm.get('contenido')?.value,
//         imagen: base64
//       };

//       this.articuloService.create(articulo).subscribe({
//         next: (response) => {
//           console.log('Artículo guardado:', response);
//           alert('Artículo guardado correctamente');
//           this.articuloForm.reset();
//         },
//         error: (error) => {
//           console.error('Error al guardar:', error);
//           alert('Error al guardar el artículo');
//         }
//       });
//     }
//   }

//   private convertirImagenABase64(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = error => reject(error);
//     });
//   }
// }
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

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService
  ) {
    this.articuloForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      subtitulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.minLength(20)]],
      imagen: [null, Validators.required]  // Asegúrate de agregar la validación para la imagen
    });
  }

  ngOnInit(): void {}

  onImagenSeleccionada(event: any): void {
    const file = event.target.files[0];
    this.imagenSeleccionada = file;

    // Actualiza el valor del campo imagen en el formulario
    this.articuloForm.patchValue({
      imagen: file
    });

    // Marca el campo de imagen como tocado para aplicar las validaciones
    this.articuloForm.get('imagen')?.markAsTouched();
  }

  async guardarArticulo(): Promise<void> {
    if (this.articuloForm.valid && this.imagenSeleccionada) {
      // Convertir la imagen a Base64
      const base64 = await this.convertirImagenABase64(this.imagenSeleccionada);
      
      const articulo: Articulos = {
        titulo: this.articuloForm.get('titulo')?.value,
        subtitulo: this.articuloForm.get('subtitulo')?.value,
        contenido: this.articuloForm.get('contenido')?.value,
        imagen: base64
      };

      this.articuloService.create(articulo).subscribe({
        next: (response) => {
          console.log('Artículo guardado:', response);
          alert('Artículo guardado correctamente');
          this.articuloForm.reset();
          this.imagenSeleccionada = null;  // Limpiar la imagen después de guardar
        },
        error: (error) => {
          console.error('Error al guardar:', error);
          alert('Error al guardar el artículo');
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
