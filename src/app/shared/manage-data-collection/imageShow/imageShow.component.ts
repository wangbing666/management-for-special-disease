import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-show',
  templateUrl: './imageShow.component.html',
  styleUrls: ['./imageShow.component.css']
})
export class ImageShowComponent implements OnInit {
  @Input() imgList: any;

  index = 1;
  size = 100;
  angle = 0;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.imgList);
  }

  previous() {
    if (this.index > 1) {
      this.index--;
      this.reset();
    }
  }

  next() {
    if (this.index < this.imgList.length) {
      this.index++;
      this.reset();
    }
  }

  enlarge() {
    this.size *= 1.2;
  }

  reduce() {
    this.size /= 1.2;
  }

  rotate() {
    this.angle += 90;
  }

  reset() {
    this.size = 100;
    this.angle = 0;
  }

  getImageSize() {
    return `rotate(${this.angle}deg)`;
  }

  getImageWidth() {
    return `${this.size}%`;
  }
}
