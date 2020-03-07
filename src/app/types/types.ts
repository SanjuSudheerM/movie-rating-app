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
