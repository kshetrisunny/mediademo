import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {

  myDate: String = new Date().toISOString();

  today = new Date();
  constructor() {
    this.startTime();
   }

  ngOnInit() {
  }

  startTime() {
    var intervalVar = setInterval(function () {
      this.today = new Date().toISOString();
    }.bind(this),500)}
}
