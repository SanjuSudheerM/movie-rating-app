import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingStarsComponent } from './rating-stars.component';
import { SimpleChange } from '@angular/core';

describe('RatingStarsComponent', () => {
  let component: RatingStarsComponent;
  let fixture: ComponentFixture<RatingStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingStarsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update rate stars count', () => {
    component.rateOn = 5;
    component.generateRating();
    expect(component.rating.length).toEqual(5);
  });

  it('should create 20 children for 5 stars', () => {
    component.rateOn = 5;
    component.generateRating();
    fixture.detectChanges();
    const length = component.elRef.nativeElement.querySelector('.rating-stars').children.length;
    expect(length).toEqual(20);
  });
  it('should selected 6 stars', () => {
    component.rateOn = 10;
    component.id = 'movie_001';
    component.currentRating = 6;
    component.generateRating();
    fixture.detectChanges();
    component.updateRating();
    fixture.detectChanges();
    expect(component.elRef.nativeElement.querySelector('#rating-star-half-movie_001-4').checked).toBeTruthy();
  });
  it('should selected 7.8 stars', () => {
    component.rateOn = 10;
    component.id = 'movie_001';
    component.currentRating = 7.8;
    component.generateRating();
    fixture.detectChanges();
    component.updateRating();
    fixture.detectChanges();
    expect(component.elRef.nativeElement.querySelector('#rating-star-full-movie_001-2').checked).toBeTruthy();
  });

  it('should detect rating change', () => {
    component.currentRating = 10;
    component.rateOn = 10;
    component.id = 'movie_001';
    component.generateRating();
    fixture.detectChanges();
    component.ngOnChanges({
      currentRating: new SimpleChange(null, component.currentRating, false)
    });
    fixture.detectChanges();
    expect(component.elRef.nativeElement.querySelector('#rating-star-half-movie_001-0').checked).toBeTruthy();
  });

  it('should detect rating change', () => {
    component.currentRating = 10;
    component.rateOn = 8;
    component.id = 'movie_001';
    component.generateRating();
    fixture.detectChanges();
    component.ngOnChanges({
      currentRating: new SimpleChange(null, component.currentRating, false)
    });
    fixture.detectChanges();
    expect(component.elRef.nativeElement.querySelector('#rating-star-half-movie_001-0').checked).toBeFalsy();
  });


  it('should detect rating change', () => {
    component.currentRating = 10;
    component.ngOnChanges({
      currentRating: new SimpleChange(null, 5, false)
    });
    fixture.detectChanges();
    expect(component.currentRating).toEqual(5);
  });

  it('should not update current rating if it\'s not change', () => {
    component.currentRating = 10;
    component.ngOnChanges({
      id: new SimpleChange(null, 'MOVIE_004', false)
    });
    fixture.detectChanges();
    expect(component.currentRating).toEqual(10);
  });

  it('should update current rating when user update rating to 4', () => {
    component.currentRating = 7;
    component.id = 'MOVIE_004';
    component.rateOn = 10;
    component.generateRating();
    fixture.detectChanges();
    component.selectedRating(6, 'FULL');
    expect(component.currentRating).toEqual(4);
  });

  it('should update current rating when user update 3.5', () => {
    component.currentRating = 7;
    component.id = 'MOVIE_004';
    component.rateOn = 10;
    component.generateRating();
    fixture.detectChanges();
    component.selectedRating(6, 'HALF');
    expect(component.currentRating).toEqual(3.5);
  });


  it('should update current rating when user giving 10 stars', () => {
    component.currentRating = 6;
    component.id = 'MOVIE_004';
    component.rateOn = 10;
    component.generateRating();
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#rating-star-half-Movie_004-0').nextSibling.click();
    expect(component.currentRating).toEqual(10);
  });
});
