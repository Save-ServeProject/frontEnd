// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HeroSectionBlogComponent } from '../../components/hero-section-blog/hero-section-blog.component';
// import { ArticuloService } from '../../services/articuloService/articulo.service';
// import { Articulos } from '../../models/articulos.model';

// @Component({
//   selector: 'app-articles',
//   standalone: true,
//     imports: [CommonModule,RouterModule,HeroSectionBlogComponent],
//   templateUrl: './articles.component.html',
//   styleUrl: './articles.component.scss'
// })
// export class ArticlesComponent {
//   articulos: Articulos[] = [];

//   constructor(private articuloService: ArticuloService) { }

//   ngOnInit(): void {
//     this.articuloService.obtenerArticulos().subscribe(
//       (data: Articulos[]) => this.articulos = data,
//       (error) => console.error('Error al cargar artículos', error)
//     );
//   }
// }
// articles.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroSectionBlogComponent } from '../../components/hero-section-blog/hero-section-blog.component';
import { ArticuloService } from '../../services/articuloService/articulo.service';
import { Articulos } from '../../models/articulos.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSectionBlogComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  articulos: Articulos[] = [];

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articuloService.obtenerArticulos().subscribe({
      next: (data: Articulos[]) => {
        console.log('Artículos recibidos:', data); // Para debugging
        this.articulos = data;
        // Verificar que cada artículo tiene un ID
        this.articulos.forEach(articulo => {
          console.log('ID del artículo:', articulo.idArticulo);
        });
      },
      error: (error) => console.error('Error al cargar artículos:', error)
    });
  }
}