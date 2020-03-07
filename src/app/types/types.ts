export interface Movie {
    movieId: string;
    title: string;
    rating: number;
    moviePoster: string;
    releasedYear: number;
    category: Array<string>;
    description: string;
    cast: Array<Cast>;
}

export interface Cast {
    castName: string;
    castType: string;
    castImage: string;
}

export interface RandomRating {
    isRandomRatingEnabled: boolean;
    randomInterval: number;
    randomMovieIndex: number;
    randomRating: number;
}
