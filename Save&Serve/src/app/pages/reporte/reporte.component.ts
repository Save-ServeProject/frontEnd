// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ReporteService } from '../../services/reporteService/reporte.service';
// import { Reporte } from '../../models/reporte.model';
// import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-reporte',
//   templateUrl: './reporte.component.html',
//   styleUrls: ['./reporte.component.css'],
//   imports: [CommonModule],
// })
// export class ReporteComponent implements OnInit {
//   reporte: Reporte | null = null;
//   year: number = new Date().getFullYear();
//   error: string | null = null;
  
//   @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
//   chart: Chart | null = null;
  
//   constructor(private reporteService: ReporteService) {}

//   ngOnInit(): void {
//     this.obtenerReporte();
//   }

//   // obtenerReporte(): void {
//   //   this.reporteService.getReporte(this.year).subscribe({
//   //     next: (data: Reporte) => {
//   //       this.reporte = data;
//   //       this.crearGrafico();
//   //     },
//   //     error: (err) => {
//   //       console.error(err);
//   //       this.error = 'Error al obtener el reporte';
//   //     }
//   //   });
//   // }
//   obtenerReporte(): void {
//   this.reporteService.getReporte(this.year).subscribe({
//     next: (data: Reporte) => {
//       console.log('📊 Datos recibidos del backend:', data); // <-- Verificar si llegan datos
//       this.reporte = data;
//       this.crearGrafico();
//     },
//     error: (err) => {
//       console.error('❌ Error en la petición:', err);
//       this.error = 'Error al obtener el reporte';
//     }
//   });
// }

//   crearGrafico(): void {
//     if (this.chart) {
//       this.chart.destroy();
//     }
//     if (this.reporte) {
//       const ctx = this.myChart.nativeElement.getContext('2d');
//       if (ctx) {
//         this.chart = new Chart(ctx, {
//           type: 'bar',
//           data: {
//             labels: ['Total Donaciones', 'Monto Total Donado'],
//             datasets: [{
//               label: 'Estadísticas del año ' + this.reporte.year,
//               data: [this.reporte.totalDonaciones, this.reporte.totalMonto],
//               backgroundColor: ['#007bff', '#28a745']
//             }]
//           },
//           options: {
//             responsive: true,
//             scales: {
//               y: {
//                 beginAtZero: true
//               }
//             }
//           }
//         });
//       }
//     }
//   }
// }

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReporteService } from '../../services/reporteService/reporte.service';
import { Reporte } from '../../models/reporte.model';
import { Chart, registerables } from 'chart.js'; // ✅ Importa registerables

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  imports: [CommonModule],
})
export class ReporteComponent implements OnInit {
  reporte: any = null;
  year: number = new Date().getFullYear();
  error: string | null = null;

  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productChart') productChart!: ElementRef<HTMLCanvasElement>; 
  chart: Chart | null = null;
  productChartInstance: Chart | null = null; 


  constructor(private reporteService: ReporteService) {
    Chart.register(...registerables); // ✅ Registra todos los componentes necesarios
  }

  ngOnInit(): void {
    this.obtenerReporte();
  }

  // obtenerReporte(): void {
  //   this.reporteService.getReporte(this.year).subscribe({
  //     next: (data: any) => {
  //       console.log('📊 Datos recibidos del backend:', data);
  //       this.reporte = data;
  //       setTimeout(() => this.crearGrafico()); // Da tiempo para renderizar el canvas
  //     },
  //     error: (err) => {
  //       console.error('❌ Error en la petición:', err);
  //       this.error = 'Error al obtener el reporte';
  //     }
  //   });
  // }

  obtenerReporte(): void {
    this.reporteService.getReporte(this.year).subscribe({
      next: (data: Reporte) => {
        console.log('📊 Datos recibidos del backend:', data);
        this.reporte = data;
  
        setTimeout(() => {
          this.crearGrafico(); // 📊 Gráfico de estadísticas generales
          this.crearGraficoProductos(); // 📊 Gráfico de productos más donados
        });
      },
      error: (err) => {
        console.error('❌ Error en la petición:', err);
        this.error = 'Error al obtener el reporte';
      }
    });
  }

  crearGrafico(): void {
    if (!this.myChart || !this.myChart.nativeElement) {
      console.error("❌ Error: El canvas no está disponible.");
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error("❌ Error: No se pudo obtener el contexto del canvas.");
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Donaciones', 'Monto Total Donado'],
        datasets: [{
          label: 'Estadísticas del año ' + this.reporte!.year,
          data: [this.reporte!.totalDonaciones, this.reporte!.totalMonto],
          backgroundColor: ['#007bff', '#28a745']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  crearGraficoProductos(): void {
    if (!this.productChart || !this.productChart.nativeElement) {
      console.error("❌ Error: El canvas de productos más donados no está disponible.");
      return;
    }
  
    if (this.productChartInstance) {
      this.productChartInstance.destroy();
    }
  
    if (this.reporte?.productosMasDonados?.length > 0) {
      const ctx = this.productChart.nativeElement.getContext('2d');
  
      if (ctx) {
        const labels = this.reporte.productosMasDonados.map((p: { nombre: string; cantidad: number }) => p.nombre);
        const data = this.reporte.productosMasDonados.map((p: { nombre: string; cantidad: number }) => p.cantidad);
          
        this.productChartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Productos más donados',
              data: data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF'],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true
          }
        });
      } else {
        console.error("❌ Error: No se pudo obtener el contexto del canvas de productos más donados.");
      }
    } else {
      console.warn("⚠️ No hay productos más donados en el reporte.");
    }
  }
}
