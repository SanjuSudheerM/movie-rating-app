import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, RandomRating } from '../types/types';
import { environment } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';

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
  randomTimer: any;

  /** Storing the subscriptions used */
  subscriptions: Array<Subscription> = [];

  /**
   * Http Service
   * @param httpService - dependency used to fetch the movies from url
   */
  constructor(public httpService: HttpClient) { }

  ngOnInit() {
    this.getMovies();
  }
  /**
   * sorting the movies in descending order based on the rating
   */
  filterBasedOnRating() {
    this.movieList.sort((a, b) => b.rating - a.rating);
  }

  /**
   * Getting the list of movies & sorting it
   */
  getMovies() {
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
  getUpdatedRating(rating: number, movieIndex: number) {
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
  startRandomRating() {
    this.randomRating.isRandomRatingEnabled = true;
    // generating a random number within 60 and converting to milliseconds
    // @randomInterval will be in seconds
    this.randomRating.randomInterval = Math.floor(Math.random() * 60) * 1000;

    this.randomTimer = interval(this.randomRating.randomInterval);
    this.subscriptions.push(
      this.randomTimer.subscribe(
        (res: number) => {
          this.updateRandomMovie();
        }
      )
    );
  }

  /**
   * Generating random movie index and rating & reordering the cards if necessary
   */
  updateRandomMovie() {
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
  stopRandomRating() {
    this.randomRating.isRandomRatingEnabled = false;
    this.randomRating.randomMovieIndex = -1;
    this.randomTimer.unsubscribe();
  }

  /**
   * Unsubscribing the subscriptions used
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
