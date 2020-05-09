import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'islands'],
        name: 'Island',
        moduleId: PLATFORM.moduleName('views/islands'),
        nav: true,
        title: 'Add Islands'
      },
      // {
      //   route: 'candidates',
      //   name: 'candidates',
      //   moduleId: PLATFORM.moduleName('views/candidates'),
      //   nav: true,
      //   title: 'Candidate'
      // }
    ]);
    this.router = router;
  }
}
