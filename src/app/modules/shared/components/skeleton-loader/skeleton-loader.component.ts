import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {

  @Input() count : number = 1
  numberOfTimes:Array<number>
  constructor() { 
  }

  ngOnInit(): void {
    this.numberOfTimes = Array(this.count).fill(0).map((x,i)=>i);
  }

}
