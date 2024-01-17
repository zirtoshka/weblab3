import {ApplicationConfig} from '@angular/core'
import {provideRouter, withHashLocation} from '@angular/router'

import {routes} from './app.routes'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {authInterceptor} from './auth.interceptor'
import {provideAnimations} from '@angular/platform-browser/animations'
import {MessageService} from 'primeng/api'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()), // keep withHashLocation() for production
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    MessageService
  ]
}
