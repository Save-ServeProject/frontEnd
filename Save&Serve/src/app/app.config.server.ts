import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app-routing.module';

const serverConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation())]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
