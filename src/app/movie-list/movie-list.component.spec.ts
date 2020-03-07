import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../types/types';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  const movieList: Array<Movie> = [
    {
      "movieId": "MOVIE_001",
      "title": "Joker",
      "rating": 8.6,
      "moviePoster": "assets/film-posters/avengers.jpg",
      "releasedYear": 2019,
      "category": [
        "Crime",
        "Drama",
        "Thriller"
      ],
      "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
      "cast": [
        {
          "castName": "Todd Phillips",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNGY5MWRjM2MtNDkzNC00MDcwLWE2ZjYtOWNlZmM3MWIyNGZmXkEyXkFqcGdeQXVyMTAxMjM5NTA4._V1_QL50_SY1000_SX1500_AL_.jpg"
        },
        {
          "castName": "Joaquin Phoenix",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_QL50_.jpg"
        },
        {
          "castName": "Robert De Niro",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_QL50_.jpg"
        }
      ]
    },
    {
      "movieId": "MOVIE_002",
      "title": "Avengers: Endgame",
      "rating": 8.5,
      "moviePoster": "assets/film-posters/avengers.jpg",
      "releasedYear": 2019,
      "category": [
        "Action",
        "Adventure",
        "Drama"
      ],
      "description": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
      "cast": [
        {
          "castName": "Anthony Russo",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTc2NjM5MTM0Ml5BMl5BanBnXkFtZTgwMTY3ODczNjM@._V1_QL50_SY1000_CR0,0,635,1000_AL_.jpg"
        },
        {
          "castName": "Joe Russo",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTc2NzY1NTY5OF5BMl5BanBnXkFtZTgwNjY3ODczNjM@._V1_QL50_SY1000_CR0,0,691,1000_AL_.jpg"
        },
        {
          "castName": "Robert Downey Jr.",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_QL50_SY1000_CR0,0,664,1000_AL_.jpg"
        }
      ]
    },
    {
      "movieId": "MOVIE_003",
      "title": "The Dark Knight",
      "rating": 9,
      "moviePoster": "assets/film-posters/joker.jpg",
      "releasedYear": 2008,
      "category": [
        "Action",
        "Crime",
        "Drama"
      ],
      "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      "cast": [
        {
          "castName": "Christopher Nolan",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_UY317_CR7,0,214,317_AL__QL50.jpg"
        },
        {
          "castName": "Christian Bale",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTkxMzk4MjQ4MF5BMl5BanBnXkFtZTcwMzExODQxOA@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg"
        },
        {
          "castName": "Heath Ledger",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_UX214_CR0,0,214,317_AL__QL50.jpg"
        }
      ]
    },
    {
      "movieId": "MOVIE_004",
      "title": "The Shawshank Redemption",
      "rating": 9.3,
      "moviePoster": "assets/film-posters/joker.jpg",
      "releasedYear": 1994,
      "category": [
        "Drama"
      ],
      "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "cast": [
        {
          "castName": "Frank Darabont",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNjk0MTkxNzQwOF5BMl5BanBnXkFtZTcwODM5OTMwNA@@._V1_UY317_CR20,0,214,317_AL__QL50.jpg"
        },
        {
          "castName": "Tim Robbins",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTI1OTYxNzAxOF5BMl5BanBnXkFtZTYwNTE5ODI4._V1_UY317_CR16,0,214,317_AL__QL50.jpg"
        },
        {
          "castName": "Morgan Freeman",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMTc0MDMyMzI2OF5BMl5BanBnXkFtZTcwMzM2OTk1MQ@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg"
        }
      ]
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListComponent],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie title as \'Joker (2019)\' on html', () => {
    component.movieList = [{
      "movieId": "MOVIE_001",
      "title": "Joker",
      "rating": 8.6,
      "moviePoster": "assets/film-posters/avengers.jpg",
      "releasedYear": 2019,
      "category": [
        "Crime",
        "Drama",
        "Thriller"
      ],
      "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
      "cast": [
        {
          "castName": "Todd Phillips",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNGY5MWRjM2MtNDkzNC00MDcwLWE2ZjYtOWNlZmM3MWIyNGZmXkEyXkFqcGdeQXVyMTAxMjM5NTA4._V1_QL50_SY1000_SX1500_AL_.jpg"
        },
        {
          "castName": "Joaquin Phoenix",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_QL50_.jpg"
        },
        {
          "castName": "Robert De Niro",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_QL50_.jpg"
        }
      ]
    }];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('h5').innerText)
      .toEqual(`Joker (2019)`);
  });

  it('should render movie description as \'Joker (2019)\' on html', () => {
    component.movieList = [{
      "movieId": "MOVIE_001",
      "title": "Joker",
      "rating": 8.6,
      "moviePoster": "assets/film-posters/avengers.jpg",
      "releasedYear": 2019,
      "category": [
        "Crime",
        "Drama",
        "Thriller"
      ],
      "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.",
      "cast": [
        {
          "castName": "Todd Phillips",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNGY5MWRjM2MtNDkzNC00MDcwLWE2ZjYtOWNlZmM3MWIyNGZmXkEyXkFqcGdeQXVyMTAxMjM5NTA4._V1_QL50_SY1000_SX1500_AL_.jpg"
        },
        {
          "castName": "Joaquin Phoenix",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_QL50_.jpg"
        },
        {
          "castName": "Robert De Niro",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_QL50_.jpg"
        }
      ]
    }];
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.movie-card-content p.small-font').innerText)
      .toEqual('In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.');
  });

  it('should render 3 crew images on html', () => {
    component.movieList = [{
      "movieId": "MOVIE_001",
      "title": "Joker",
      "rating": 8.6,
      "moviePoster": "assets/film-posters/avengers.jpg",
      "releasedYear": 2019,
      "category": [
        "Crime",
        "Drama",
        "Thriller"
      ],
      "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.",
      "cast": [
        {
          "castName": "Todd Phillips",
          "castType": "Director",
          "castImage": "https://m.media-amazon.com/images/M/MV5BNGY5MWRjM2MtNDkzNC00MDcwLWE2ZjYtOWNlZmM3MWIyNGZmXkEyXkFqcGdeQXVyMTAxMjM5NTA4._V1_QL50_SY1000_SX1500_AL_.jpg"
        },
        {
          "castName": "Joaquin Phoenix",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BZGMyY2Q4NTEtMWVkZS00NzcwLTkzNmQtYzBlMWZhZGNhMDhkXkEyXkFqcGdeQXVyNjk1MjYyNTA@._V1_QL50_.jpg"
        },
        {
          "castName": "Robert De Niro",
          "castType": "Actor",
          "castImage": "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_QL50_.jpg"
        }
      ]
    }];
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('ul').children.length)
      .toEqual(3);
  });

  it('should sort based on rating in descending order', () => {
    component.movieList = movieList;
    component.filterBasedOnRating();
    expect(component.movieList[0].rating).toBeGreaterThan(component.movieList[1].rating);
  });

  it('should not sort in ascending order based on rating', () => {
    component.movieList = movieList;
    component.filterBasedOnRating();
    expect(component.movieList[0].rating < component.movieList[1].rating).toBeFalsy();
  });

  it('should re-order UI elements when sorted based on rating', () => {
    component.movieList = movieList;
    component.filterBasedOnRating();
    fixture.detectChanges();

    const ratingOnUI = fixture.debugElement.nativeElement.querySelectorAll('p.semi-bold.text-left')[0].innerText;
    expect(ratingOnUI).toEqual('9.3');
  });

  it('should re-order UI elements when sorted based on rating & smallest at the end', () => {
    component.movieList = movieList;
    component.filterBasedOnRating();
    fixture.detectChanges();
    const elements = fixture.debugElement.nativeElement.querySelectorAll('p.semi-bold.text-left');
    const ratingOnUI = elements[elements.length - 1].innerText;
    expect(ratingOnUI).toEqual('8.5');
  });
});
