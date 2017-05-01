import {MetricsComponent} from './metrics.component';
import {RouterModule} from '@angular/router';
const routes = [
  {path: '', component: MetricsComponent}
];

export const MetricsRoutes = RouterModule.forChild(routes);
