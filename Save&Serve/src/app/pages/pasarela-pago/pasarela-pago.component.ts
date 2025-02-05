import { Component } from '@angular/core';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';

@Component({
  selector: 'app-pasarela-pago',
  imports: [],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.scss'
})
export class PasarelaPagoComponent {
  // plan: string = '';
  // price: number = 0;

  // constructor(private subscriptionService: SuscripcionService) {}

  // ngOnInit() {
  //   this.plan = this.subscriptionService.getPlan();
  //   this.price = this.subscriptionService.getPrice();
  // }
  plan: string = 'Premium'; // Nombre inicial del plan
  price: number = 0;

  constructor(private subscriptionService: SuscripcionService) {}

  ngOnInit() {
    this.plan = this.subscriptionService.getPlan() || 'Premium';
    this.price = this.subscriptionService.getPrice();
  }

  seleccionarPlan(plan: string) {
    this.subscriptionService.setPlan(plan); // Actualiza el plan en el servicio
    this.plan = plan;
    this.price = this.subscriptionService.getPrice();
  }
}
