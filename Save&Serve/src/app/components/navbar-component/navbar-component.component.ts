import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login-component/login-component.component';
import { RegisterComponent } from '../../register-component/register-component.component';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent);
  }

  openRegisterModal(type: 'volunteers' | 'partners') {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.componentInstance.type = type;
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
  
}