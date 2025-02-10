import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-empresas',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gestion-empresas.component.html',
  styleUrl: './gestion-empresas.component.scss'
})
export class GestionEmpresasComponent {

}
