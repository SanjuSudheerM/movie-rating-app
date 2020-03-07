import { Component, OnInit, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, OnChanges, AfterViewInit {

  rateOn = environment.maximumRating;
  @Input() id: string;
  @Input() currentRating: number;
  @Output() getRating: EventEmitter<number>;
  rating: Array<number> = [];

  constructor(public elRef: ElementRef) {
    this.getRating = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.generateRating();
  }
  ngAfterViewInit(): void {
    this.updateRating();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentRating && changes.currentRating.currentValue) {
      this.currentRating = changes.currentRating.currentValue;
      this.updateRating();
    }
  }

  generateRating(): void {
    this.rating = [];
    for (let i = 0; i < this.rateOn; i++) {
      this.rating.push(i);
    }
  }

  public selectedRating(index: number, type: string): void {
    this.currentRating = (this.rateOn - index);
    if (type === 'HALF') {
      this.currentRating -= 0.5;
    }
    this.getRating.emit(this.currentRating);
  }

  updateRating(): void {
    let rate = Math.floor(this.currentRating);
    const isHalf = this.currentRating - rate > 0 ? 'full' : 'half';
    rate = isHalf === 'full' ? rate + 1 : rate;
    const tid = `#rating-star-${isHalf}-${this.id}-${this.rateOn - rate}`;
    const element = this.elRef.nativeElement.querySelector(tid);
    if (element) {
      element.checked = true;
    }
  }

}
