
import {RouterModule} from '@angular/router';
import {SettingsComponent} from './settings.component';
const routes = [
  {
    path: '', component: SettingsComponent
  }
];

export const SettingsRouting = RouterModule.forChild(routes);
