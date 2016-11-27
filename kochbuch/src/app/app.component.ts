import { Component } from '@angular/core';
import {State} from './shared/app.state.service';

@Component({
  selector: 'kb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public state:State){}
}
