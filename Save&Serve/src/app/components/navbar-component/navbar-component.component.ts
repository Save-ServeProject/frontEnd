// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';

// @Component({
//   selector: 'app-navbar-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule,RouterModule],
//   templateUrl: './navbar-component.component.html',
//   styleUrls: ['./navbar-component.component.scss']
// })
// export class NavbarComponent implements OnInit {
//   searchTerm: string = '';

//   constructor(
//     private modalService: NgbModal, 
//     private router: Router,
//     private subscriptionService: SuscripcionService
//   ) {}

//   ngOnInit(): void {
    
//   }

//   onSearch() {
//     if (this.searchTerm.trim()) {
//       this.router.navigate(['/search'], { 
//         queryParams: { q: this.searchTerm } 
//       });
//     }
//   }

//   scrollToSection(sectionId: string) {
//     document.getElementById(sectionId)?.scrollIntoView({ 
//       behavior: 'smooth' 
//     });
//   }

//   selectPlan(plan: string) {
//     this.subscriptionService.setPlan(plan);
//   }

//   goToPayment() {
//     this.router.navigate(['/pasarelaPago']);
//   }
// }


//segundo internto: 

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
// import { AuthService } from '../../services/autentificacion/auth.service'; // Nuevo servicio de autenticación

// @Component({
//   selector: 'app-navbar-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './navbar-component.component.html',
//   styleUrls: ['./navbar-component.component.scss']
// })
// export class NavbarComponent implements OnInit {
//   searchTerm: string = '';
  
//   // Datos para el login
//   loginData = {
//     email: '',
//     password: ''
//   };

//   // Estado de autenticación
//   isLoggedIn: boolean = false;
//   userRole: string | null = null;

//   constructor(
//     private modalService: NgbModal, 
//     private router: Router,
//     private subscriptionService: SuscripcionService,
//     private authService: AuthService // Inyectar servicio de autenticación
//   ) {}

//   ngOnInit(): void {
//     // Verificar si hay un token al iniciar
//     this.checkAuthStatus();
//   }

//   // Método para verificar estado de autenticación
//   private checkAuthStatus() {
//     const token = localStorage.getItem('authToken');
//     this.isLoggedIn = !!token;
    
//     if (this.isLoggedIn) {
//       // Aquí podrías implementar un método en el servicio de auth 
//       // para decodificar el token y obtener el rol
//       this.userRole = this.getUserRoleFromToken();
//     }
//   }

//   // Método de inicio de sesión
//   onLogin() {
//     this.authService.login(this.loginData.email, this.loginData.password)
//       .subscribe({
//         next: (response) => {
//           // Guardar token
//           localStorage.setItem('authToken', response.token);
          
//           // Actualizar estado de autenticación
//           this.checkAuthStatus();
          
//           // Redirigir según el rol
//           this.navigateBasedOnRole(this.userRole);
          
//           // Cerrar modal de login
//           this.modalService.dismissAll();
//         },
//         error: (error) => {
//           console.error('Error de inicio de sesión', error);
//           // Mostrar mensaje de error al usuario
//           alert('Error al iniciar sesión. Compruebe sus credenciales.');
//         }
//       });
//   }

//   // Método de cierre de sesión
//   logout() {
//     // Eliminar token
//     localStorage.removeItem('authToken');
    
//     // Resetear estado de autenticación
//     this.isLoggedIn = false;
//     this.userRole = null;
    
//     // Redirigir a página principal
//     this.router.navigate(['/']);
//   }

//   // Navegación según rol
//   private navigateBasedOnRole(role: string | null) {
//     switch(role) {
//       case 'EMPRESA':
//         this.router.navigate(['/empresas-donacion']);
//         break;
//       case 'ADMIN':
//         this.router.navigate(['/zonaAdmin']);
//         break;
//       case 'BANCO_DE_ALIMENTOS':
//         this.router.navigate(['/banco-alimentos']);
//         break;
//       default:
//         this.router.navigate(['/']);
//     }
//   }

//   // Método para obtener rol desde el token (implementación básica)
//   private getUserRoleFromToken(): string | null {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       // Aquí deberías implementar la lógica para decodificar el token
//       // Por ahora, un placeholder
//       try {
//         // Ejemplo básico, deberías usar una librería como jwt-decode
//         const tokenParts = token.split('.');
//         if (tokenParts.length > 1) {
//           const payload = JSON.parse(atob(tokenParts[1]));
//           return payload.role || null;
//         }
//       } catch (error) {
//         console.error('Error al decodificar token', error);
//       }
//     }
//     return null;
//   }

//   // Métodos existentes
//   onSearch() {
//     if (this.searchTerm.trim()) {
//       this.router.navigate(['/search'], { 
//         queryParams: { q: this.searchTerm } 
//       });
//     }
//   }

//   scrollToSection(sectionId: string) {
//     document.getElementById(sectionId)?.scrollIntoView({ 
//       behavior: 'smooth' 
//     });
//   }

//   selectPlan(plan: string) {
//     this.subscriptionService.setPlan(plan);
//   }

//   goToPayment() {
//     this.router.navigate(['/pasarelaPago']);
//   }
// }


//tercer intento:

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
// import { AuthService } from '../../services/autentificacion/auth.service';

// @Component({
//   selector: 'app-navbar-component',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './navbar-component.component.html',
//   styleUrls: ['./navbar-component.component.scss']
// })
// export class NavbarComponent implements OnInit {
//   searchTerm: string = '';
  
//   // Datos para el login
//   loginData = {
//     email: '',
//     password: ''
//   };

//   // Estado de autenticación
//   isLoggedIn: boolean = false;
//   userRole: string | null = null;

//   constructor(
//     private modalService: NgbModal, 
//     private router: Router,
//     private subscriptionService: SuscripcionService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     // Verificar si hay un token al iniciar
//     this.checkAuthStatus();
//   }

//   // Método para verificar estado de autenticación
//   private checkAuthStatus() {
//     this.isLoggedIn = this.authService.isLoggedIn();
    
//     if (this.isLoggedIn) {
//       this.userRole = this.authService.getUserRole();
//     }
//   }

//   // Método de inicio de sesión
//   // onLogin() {
//   //   this.authService.login(this.loginData.email, this.loginData.password)
//   //     .subscribe({
//   //       next: (response: any) => {
//   //         // Actualizar estado de autenticación
//   //         this.checkAuthStatus();
          
//   //         // Redirigir según el rol
//   //         this.navigateBasedOnRole(this.userRole);
          
//   //         // Cerrar modal de login
//   //         this.modalService.dismissAll();
//   //       },
//   //       error: (error: any) => {
//   //         console.error('Error de inicio de sesión', error);
//   //         // Mostrar mensaje de error al usuario
//   //         alert('Error al iniciar sesión. Compruebe sus credenciales.');
//   //       }
//   //     });
//   // }

//   onLogin() {
//     this.authService.login(this.loginData.email, this.loginData.password)
//       .subscribe({
//         next: (response: any) => {
//           // Actualizar estado de autenticación
//           this.checkAuthStatus();
          
//           // Redirigir según el rol
//           this.navigateBasedOnRole(this.userRole);
          
//           // Mostrar mensaje de éxito
//           alert(`Bienvenido, ${this.loginData.email}!`);
          
//           // Cerrar modal de login
//           this.modalService.dismissAll();
//         },
//         error: (error: any) => {
//           console.error('Error de inicio de sesión', error);
//           // Mostrar mensaje de error al usuario
//           alert('Error al iniciar sesión. Compruebe sus credenciales.');
//         }
//       });
//   }

//   // Método de cierre de sesión
//   logout() {
//     // Llamar al método de logout del servicio de autenticación
//     this.authService.logout();
    
//     // Actualizar estado de autenticación
//     this.checkAuthStatus();
    
//     // Redirigir a página principal
//     this.router.navigate(['/']);
//   }

//   // Navegación según rol
//   // private navigateBasedOnRole(role: string | null) {
//   //   switch(role) {
//   //     case 'EMPRESA':
//   //       this.router.navigate(['/empresas-donacion']);
//   //       break;
//   //     case 'ADMIN':
//   //       this.router.navigate(['/zonaAdmin']);
//   //       break;
//   //     case 'BANCO_DE_ALIMENTOS':
//   //       this.router.navigate(['/banco-alimentos']);
//   //       break;
//   //     default:
//   //       this.router.navigate(['/']);
//   //   }
//   // }
//   private navigateBasedOnRole(role: string | null) {
//     console.log('Navigating with role:', role);
//     switch(role) {
//       case 'EMPRESA':
//         this.router.navigate(['/empresas-donacion']);
//         break;
//       case 'ADMIN':
//         this.router.navigate(['/zonaAdmin']);
//         break;
//       case 'BANCO_DE_ALIMENTOS':
//         this.router.navigate(['/banco-alimentos']);
//         break;
//       default:
//         console.log('No specific role, navigating to home');
//         this.router.navigate(['/']);
//     }
//   }

//   // Métodos existentes
//   onSearch() {
//     if (this.searchTerm.trim()) {
//       this.router.navigate(['/search'], { 
//         queryParams: { q: this.searchTerm } 
//       });
//     }
//   }

//   scrollToSection(sectionId: string) {
//     document.getElementById(sectionId)?.scrollIntoView({ 
//       behavior: 'smooth' 
//     });
//   }

//   selectPlan(plan: string) {
//     this.subscriptionService.setPlan(plan);
//   }

//   goToPayment() {
//     this.router.navigate(['/pasarelaPago']);
//   }
// }





//////cuarto intento:

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';
import { AuthService } from '../../services/autentificacion/auth.service';
import { BancoalimentosService } from '../../services/bancoAlimentoService/bancoalimentos.service';
import { BancoDeAlimentos } from '../../models/bancoAlimentos.model';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponent implements OnInit {
  beneficiarioForm!: FormGroup;
  searchTerm: string = '';
  
  loginData = {
    email: '',
    password: ''
  };

  isLoggedIn: boolean = false;
  userRole: string | null = null;
  userName: string | null = null;
  tiposDeEmpresa: string[] = ['Hotel', 'Restaurante', 'Supermercado', 'Catering', 'Tienda', 'Bar', 'Cafetería', 'Otro'];
  ciudades: string[] = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 
    'Málaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao', 
    'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', "L'Hospitalet de Llobregat", 
    'A Coruña', 'Vitoria-Gasteiz', 'Elche', 'Granada', 'Oviedo', 
    'Badalona', 'Cartagena', 'Terrassa', 'Jerez de la Frontera', 'Sabadell', 
    'Móstoles', 'Alcalá de Henares', 'Getafe', 'Almería', 'Santander', 
    'Castellón de la Plana', 'Burgos', 'Albacete', 'San Sebastián', 'Logroño', 
    'Cáceres', 'Salamanca', 'Huelva', 'Badajoz', 'Tarragona', 
    'León', 'Lleida', 'Cádiz', 'Jaén', 'Tenerife', 
    'Marbella', 'Fuenlabrada', 'Santa Cruz de Tenerife', 'Mataró', 'Tarragona', 
    'San Cristóbal de La Laguna', 'Reus', 'Pamplona', 'Toledo', 'Girona', 
    'Algeciras', 'Córdoba', 'San Sebastián de los Reyes', 'Sant Cugat del Vallès', 'Torrejón de Ardoz',
    'Pontevedra', 'Segovia', 'Soria', 'Cuenca', 'Teruel', 
    'Córdoba', 'Huesca', 'Ciudad Real', 'Zamora', 'Vigo'
  ];
  constructor(
    private modalService: NgbModal, 
    private router: Router,
    private subscriptionService: SuscripcionService,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private bancoAlimentoService: BancoalimentosService
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
   this.initForm();
  }
  private initForm(): void {
    this.beneficiarioForm = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
        email: ['', [Validators.required, Validators.email]],
        ciudadEmpresa: ['', Validators.required],
        direccion: ['', Validators.required],
        contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
}

  private checkAuthStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if (this.isLoggedIn) {
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getUserName();
    }
  }
  agregarBeneficiario() {
    if (this.beneficiarioForm.invalid) {
        Object.keys(this.beneficiarioForm.controls).forEach(key => {
            const control = this.beneficiarioForm.get(key);
            if (control?.invalid) {
                control.markAsTouched();
            }
        });
        return;
    }

    const beneficiario: BancoDeAlimentos = {
        nombre: this.beneficiarioForm.value.nombre,
        telefono: this.beneficiarioForm.value.telefono,
        email: this.beneficiarioForm.value.email,
        ciudad: this.beneficiarioForm.value.ciudadEmpresa,
        direccion: this.beneficiarioForm.value.direccion,
        contrasenia: this.beneficiarioForm.value.contrasenia
    };

    console.log('Enviando beneficiario:', beneficiario); // Para debugging

    this.bancoAlimentoService.create(beneficiario).subscribe({
        next: (response) => {
            console.log('Respuesta:', response); // Para debugging
            alert('Beneficiario registrado exitosamente');
            this.beneficiarioForm.reset();
            // const offcanvasElement = document.getElementById('offcanvasRegisterBeneficiario');
            // if (offcanvasElement) {
            //     const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            //     bsOffcanvas?.hide();
            // }
        },
        error: (error) => {
            console.error('Error al registrar:', error);
            alert('Error al registrar el beneficiario. Por favor, inténtelo de nuevo.');
        }
    });
}
  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe({
        next: (response: any) => {
          this.checkAuthStatus();
          this.navigateBasedOnRole(this.userRole);
          
          // Mostrar mensaje de bienvenida con el nombre de usuario
          alert(`¡Bienvenido, ${this.userName}!`);
          
          this.modalService.dismissAll();
        },
        error: (error: any) => {
          console.error('Error de inicio de sesión', error);
          alert('Error al iniciar sesión. Compruebe sus credenciales.');
        }
      });
  }

  logout() {
    const logoutName = this.userName || 'usuario';
    this.authService.logout();
    this.checkAuthStatus();
    alert(`¡Hasta luego, ${logoutName}!`);
    this.router.navigate(['/']);
  }

  // Resto de métodos igual que antes...

  private navigateBasedOnRole(role: string | null) {
    switch(role) {
      case 'EMPRESA':
        this.router.navigate(['/empresas-donacion']);
        break;
      case 'ADMIN':
        this.router.navigate(['/zonaAdmin']);
        break;
      case 'BANCO_DE_ALIMENTOS':
        this.router.navigate(['/banco-alimentos']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { 
        queryParams: { q: this.searchTerm } 
      });
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  selectPlan(plan: string) {
    this.subscriptionService.setPlan(plan);
  }

  goToPayment() {
    this.router.navigate(['/pasarelaPago']);
  }
}