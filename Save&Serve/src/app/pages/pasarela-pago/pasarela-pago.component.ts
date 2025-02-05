import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';

@Component({
  selector: 'app-pasarela-pago',
  imports: [],
  templateUrl: './pasarela-pago.component.html',
  styleUrl: './pasarela-pago.component.scss'
})
export class PasarelaPagoComponent implements OnInit, AfterViewInit  {
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
  ngAfterViewInit() {
    this.setupValidations();
  }
  ngOnInit() {
    this.plan = this.subscriptionService.getPlan() || 'Premium';
    this.price = this.subscriptionService.getPrice();
  }

  seleccionarPlan(plan: string) {
    this.subscriptionService.setPlan(plan); // Actualiza el plan en el servicio
    this.plan = plan;
    this.price = this.subscriptionService.getPrice();
  }

 
  setupValidations() {
    // Formateo automático de la fecha de expiración
    const expiryDateInput = document.getElementById('expiryDate') as HTMLInputElement;
    if (expiryDateInput) {
      expiryDateInput.addEventListener('input', (e: Event) => {
        const input = e.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.slice(0,2) + '/' + value.slice(2);
        }
        input.value = value;
      });
    }

    // Formateo para campos numéricos
    ['cardNumber', 'cvv'].forEach(id => {
      const element = document.getElementById(id) as HTMLInputElement;
      if (element) {
        element.addEventListener('input', (e: Event) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/\D/g, '');
        });
      }
    });

    // Validación del formulario
    const payButton = document.getElementById('payButton');
    if (payButton) {
      payButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.validateForm();
      });
    }
  }

  validateForm() {
    let valid = true;
    let firstErrorField: HTMLElement | null = null;

    // Obtener método de pago activo
    const isPaypalActive = document.getElementById('collapseTwo')?.classList.contains('show');

    // Función de validación
    const validateField = (input: HTMLInputElement, regex: RegExp, errorMsg: string): boolean => {
      const errorElement = document.getElementById(input.id + "Error");
      if (!errorElement) return true;

      errorElement.classList.add("d-none");
      
      if (input.value.trim() === "") {
        errorElement.textContent = "Este campo es obligatorio";
        errorElement.classList.remove("d-none");
        if (!firstErrorField) firstErrorField = input;
        return false;
      }
      
      if (!regex.test(input.value.trim())) {
        errorElement.textContent = errorMsg;
        errorElement.classList.remove("d-none");
        if (!firstErrorField) firstErrorField = input;
        return false;
      }
      return true;
    };

    if (isPaypalActive) {
      const paypalEmail = document.getElementById("paypalEmail") as HTMLInputElement;
      if (paypalEmail) {
        valid = validateField(
          paypalEmail,
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Correo inválido"
        );
      }
    } else {
      const cardNumber = document.getElementById("cardNumber") as HTMLInputElement;
      const expiryDate = document.getElementById("expiryDate") as HTMLInputElement;
      const cvv = document.getElementById("cvv") as HTMLInputElement;

      if (cardNumber) {
        valid = validateField(
          cardNumber,
          /^\d{16}$/,
          "Número de tarjeta debe tener 16 dígitos"
        ) && valid;
      }

      if (expiryDate) {
        valid = validateField(
          expiryDate,
          /^(0[1-9]|1[0-2])\/\d{2}$/,
          "Formato debe ser MM/YY"
        ) && valid;
      }

      if (cvv) {
        valid = validateField(
          cvv,
          /^\d{3,4}$/,
          "CVC debe tener 3 o 4 dígitos"
        ) && valid;
      }
    }

    if (firstErrorField) {
      (firstErrorField as HTMLElement).focus();
    }

    if (valid) {
      alert("Pago realizado con éxito");
    }
  }
}

