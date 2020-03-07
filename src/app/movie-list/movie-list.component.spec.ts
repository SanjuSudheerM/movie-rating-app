import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

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
});
