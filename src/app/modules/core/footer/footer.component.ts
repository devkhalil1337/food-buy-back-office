import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor(private datePipe: DatePipe) {
    this.getCurrentYear();
  }

  ngOnInit(): void {
  }

  getCurrentYear() {
    const currentDate = new Date();
    this.currentYear = parseInt(this.datePipe.transform(currentDate, 'yyyy'), 10);
  }
}

