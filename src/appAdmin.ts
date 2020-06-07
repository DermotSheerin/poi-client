import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { autoinject } from 'aurelia-framework';
import { ImageStore } from './services/image-store';

@autoinject
export class AppAdmin {
  router: Router;

  constructor(private imageStore: ImageStore) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.options.pushState = true; // With single page applications, we sometime like to remove the # from the segment to make the url appear more natural. Aurelia support this seamlessly. It needs to be explicitly enabled via pushState configuration
    config.map([
      {
        route: ['', 'users'],
        name: 'Users',
        moduleId: PLATFORM.moduleName('views/users'),
        nav: true,
        title: 'POI Users'
      },
      {
        route: 'user-islands/:id',
        name: 'user-islands',
        moduleId: PLATFORM.moduleName('resources/elements/user-islands'),
        nav: false,
        title: 'User Islands'
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
