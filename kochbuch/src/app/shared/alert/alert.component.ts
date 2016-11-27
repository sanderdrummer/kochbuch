import { Component, OnInit } from '@angular/core';
import {State} from '../app.state.service';

@Component({
  selector: 'kb-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent implements OnInit {

  constructor(public state:State) { }

  ngOnInit() {
  }

}
