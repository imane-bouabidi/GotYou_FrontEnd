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
    provideNgxStripe('pk_test_51R697o4RRHFJGYKcL3XkPjrym8HUwy1mnYbLqVzelPL4voY7XKXA68Cq6W1royCBFg0mRCgUOBxBGVUh2GYmOKZ800SDsaYRzZ')
  ]
};
