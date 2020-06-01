import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.options.pushState = true; // With single page applications, we sometime like to remove the # from the segment to make the url appear more natural. Aurelia support this seamlessly. It needs to be explicitly enabled via pushState configuration
    config.map([
      {
        route: ['', 'islands'],
        name: 'Island',
        moduleId: PLATFORM.moduleName('views/islands'),
        nav: true,
        title: 'Add Islands'
      },
      {
        route: 'updateisland/:id',
        name: 'updateisland', // it appears that name must match the route name here, is it because the view class is PascalCase  i.e., UpdateIsland?
        moduleId: PLATFORM.moduleName('views/updateisland'),
        nav: false,
        title: 'Update Islands'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
