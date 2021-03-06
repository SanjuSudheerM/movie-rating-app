import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, RandomRating } from '../types/types';
import { environment } from 'src/environments/environment';
import { interval, Subscription, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  /** List of movies */
  movieList: Array<Movie> = [];

  /** Handling random rating */
  randomRating: RandomRating = { isRandomRatingEnabled: false, randomInterval: 0, randomMovieIndex: 0, randomRating: 1 };

  /** random rating timer */
  randomTimer: Observable<number>;

  /** Storing the subscriptions used */
  subscriptions: Array<Subscription> = [];

  /** holding timer value */
  timer = 0;

  /** timer subscription */
  timerSubscription: Subscription;

  /**
   * Http Service
   * @param httpService - dependency used to fetch the movies from url
   */
  constructor(public httpService: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
  }
  /**
   * sorting the movies in descending order based on the rating
   */
  filterBasedOnRating(): void {
    this.movieList.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Getting the list of movies & sorting it
   */
  getMovies(): void {
    this.subscriptions.push(
      this.httpService.get(environment.getMovies).subscribe(
        (res: { movies: [] }) => {
          this.movieList = res.movies;
          this.filterBasedOnRating();
        }
      )
    );
  }

  /**
   * Update rating when user changes it
   * @param rating - new rating
   * @param movieIndex - selected movie index
   */
  getUpdatedRating(rating: number, movieIndex: number): void {
    this.movieList[movieIndex].rating = rating;
    // keeping a second timeout for re-ordering the cards
    setTimeout(() => {
      this.filterBasedOnRating();
    }, 1000);
  }


  /**
   * Start random rating
   * Generating random interval and updating the rating of random movie
   */
  startRandomRating(): void {
    this.randomRating.isRandomRatingEnabled = true;
    // generating a random number within 60 and converting to milliseconds
    // @randomInterval will be in seconds
    this.randomRating.randomInterval = Math.floor(Math.random() * 60) * 1000;

    this.randomTimer = interval(this.randomRating.randomInterval);
    this.runTimer();
    this.subscriptions.push(
      this.randomTimer.subscribe(
        (res: number) => {
          this.updateRandomMovie();
          this.stopTimer();
          this.runTimer();
        }
      )
    );
  }

  /**
   * Timer
   */
  runTimer() {
    this.timer = 0;
    const timerObs = timer(0, 1000);
    this.timerSubscription = timerObs.subscribe((res: number) => {
      this.timer = res;
    });
  }

  /** stopping the timer */
  stopTimer() {
    this.timerSubscription.unsubscribe();
  }

  /**
   * Generating random movie index and rating & reordering the cards if necessary
   */
  updateRandomMovie(): void {
    // generating random index of the movie
    this.randomRating.randomMovieIndex = Math.floor(Math.random() * this.movieList.length);
    this.randomRating.randomRating = Math.floor(Math.random() * (environment.maximumRating * 10)) / 10;
    this.movieList[this.randomRating.randomMovieIndex].rating = this.randomRating.randomRating;
    this.filterBasedOnRating();
  }

  /**
   * Stop random rating
   * unsubscribing the timer used and resetting the variables
   */
  stopRandomRating(): void {
    this.randomRating.isRandomRatingEnabled = false;
    this.randomRating.randomMovieIndex = -1;
    this.clearAllSubscription();
  }

  /**
   * Unsubscribing the subscriptions used
   */
  clearAllSubscription() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.stopTimer();
  }

  ngOnDestroy(): void {
    this.clearAllSubscription();
  }
}
