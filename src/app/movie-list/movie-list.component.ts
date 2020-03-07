import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, RandomRating } from '../types/types';
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Array<Movie> = [];
  randomRating: RandomRating = { isRandomRatingEnabled: false, randomInterval: 0, randomMovieIndex: 0, randomRating: 1 };

  randomTimer: any;
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
    this.httpService.get(environment.getMovies).subscribe(
      (res: { movies: [] }) => {
        this.movieList = res.movies;
        this.filterBasedOnRating();
      }
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


  startRandomRating() {
    this.randomRating.isRandomRatingEnabled = true;
    // generating a random number within 60 and converting to milliseconds
    // @randomInterval will be in seconds
    this.randomRating.randomInterval = Math.floor(Math.random() * 60) * 1000;

    this.randomTimer = interval(this.randomRating.randomInterval);
    this.randomTimer.subscribe(
      (res: number) => {
        this.updateRandomMovie();
      }
    );
  }

  updateRandomMovie() {
    // generating random index of the movie
    this.randomRating.randomMovieIndex = Math.floor(Math.random() * this.movieList.length);
    this.randomRating.randomRating = Math.floor(Math.random() * (environment.maximumRating * 10)) / 10;
    this.movieList[this.randomRating.randomMovieIndex].rating = this.randomRating.randomRating;
    this.filterBasedOnRating();
  }

  stopRandomRating() {
    this.randomTimer.unsubscribe();
  }
}
