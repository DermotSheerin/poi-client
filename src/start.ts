import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { IslandService } from './services/island-service';

@inject(IslandService)
export class Start {
  router: Router;

  constructor(private ds: IslandService) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'Login',
        moduleId: PLATFORM.moduleName('views/login'),
        nav: true,
        title: 'Login'
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: PLATFORM.moduleName('views/signup'),
        nav: true,
        title: 'Signup'
      }
    ]);
    this.router = router;
  }

  // On detection of a token it will bypass the log in screen and take us to the Island page.
  attached() {
    this.ds.checkIsAuthenticated();
  }

}
