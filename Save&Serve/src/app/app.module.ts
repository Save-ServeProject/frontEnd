import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar-component/navbar-component.component';
import { FooterComponent } from './components/footer-component/footer-component.component'; 
import { HerosectionComponent } from './components/herosection-component/herosection-component.component';
import { HowworksComponent } from './components/howworks-component/howworks-component.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HerosectionComponent,
    HowworksComponent,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }