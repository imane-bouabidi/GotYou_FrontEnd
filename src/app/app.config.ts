import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {provideHttpClient} from '@angular/common/http';
import {provideNgxStripe} from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    provideHttpClient(),
    provideNgxStripe('pk_test_51R697o4RRHFJGYKcR8uR8x8e8iL0h1ZtNqZ946tDROaIO2S8DxcEemGHdQG1WNzak5Erk004RzyQP0F')
  ]
};
