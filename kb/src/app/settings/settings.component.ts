import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage);
  }

}
