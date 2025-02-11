import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-transportes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gestion-transportes.component.html',
  styleUrl: './gestion-transportes.component.scss'
})
export class GestionTransportesComponent {

}
