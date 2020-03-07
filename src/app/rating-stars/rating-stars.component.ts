import { Component, OnInit, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, OnChanges, AfterViewInit {

  /** Maximum value of rating */
  rateOn = environment.maximumRating;

  /** Id of the card where the rating component has been embedded */
  @Input() id: string;

  /** Current Rating of the movie */
  @Input() currentRating: number;

  /**
   * Event Emitter, emitting value when user updates the rating
   */
  @Output() getRating: EventEmitter<number>;

  /** Generating the rating stars */
  rating: Array<number> = [];

  /**
   * Element reference to access the DOM Elements
   * @param elRef - Element reference object
   */
  constructor(public elRef: ElementRef) {
    this.getRating = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.generateRating();
  }


  ngAfterViewInit(): void {
    this.updateRating();
  }

  /**
   * Updating the rating based on @currentRating
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentRating && changes.currentRating.currentValue) {
      this.currentRating = changes.currentRating.currentValue;
      this.updateRating();
    }
  }


  /**
   * Generating the Stars array for UI
   */
  generateRating(): void {
    this.rating = [];
    for (let i = 0; i < this.rateOn; i++) {
      this.rating.push(i);
    }
  }

  /**
   * Calculating the rating selected by the user & emitting the updated rating to parent component
   * @param index - selected star index
   * @param type - type of selected star (FULL or HALF)
   */
  public selectedRating(index: number, type: string): void {
    this.currentRating = (this.rateOn - index);
    if (type === 'HALF') {
      this.currentRating -= 0.5;
    }
    this.getRating.emit(this.currentRating);
  }

  /**
   * Update rating
   * constructing the possible id of the element using the @currentRating &
   * mark the radio button as checked
   */
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
