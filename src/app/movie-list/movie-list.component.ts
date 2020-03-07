import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../types/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Array<Movie> = [];
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

}
