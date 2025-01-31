import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from '../../services/articuloService/articulo.service';
import { Articulos } from '../../models/articulos.model';

@Component({
    selector: 'app-articulo-detalle',
    standalone: true,
    imports: [],
    templateUrl: './articulo-detalle.component.html',
    styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {
    articulo: Articulos | undefined;

    constructor(
        private route: ActivatedRoute,
        private articuloService: ArticuloService
    ) { }
    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            console.log('ID recibido:', id);

            if (id) {
                this.articuloService.obtenerArticuloPorId(+id).subscribe(
                    (data) => {
                        this.articulo = data;
                        console.log('Artículo recibido:', data);
                    },
                    (error) => console.error('Error al obtener el artículo', error)
                );
            }
        });
    }
}
