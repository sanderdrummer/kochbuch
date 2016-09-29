import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './lists/list/list.component';
import {ListsComponent} from './lists/lists.component';

export const appRoutes: Routes = [
    { path: '', component: ListsComponent },
    { path: 'list:id', component: ListComponent },
    { path: 'list:id/products', component: ListComponent },
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes);
