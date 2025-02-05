import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuscripcionService } from '../../services/suscripcionService/suscripcion.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';

  constructor(
    private modalService: NgbModal, 
    private router: Router,
    private subscriptionService: SuscripcionService
  ) {}

  ngOnInit(): void {
    
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