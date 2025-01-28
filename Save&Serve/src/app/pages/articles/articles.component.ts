import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroSectionBlogComponent } from '../../components/hero-section-blog/hero-section-blog.component';

@Component({
  selector: 'app-articles',
  standalone: true,
    imports: [CommonModule,RouterModule,HeroSectionBlogComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {

}
