import { IMovie } from 'src/domain/entities';

export type SortType = 'popular' | 'rating';

export interface IMovieFilter {
    sortType: SortType;
}

export const DEFAULT_MOVIE_FILTER: IMovieFilter = {
    sortType: 'popular'
};

export interface IMovieRepository {
    get(filter: IMovieFilter, page: number): Promise<IMovieResponse>;
    getById(id: number): Promise<IMovie>;
    getRelatedMovies(id: number): Promise<readonly IMovie[]>;
    search(term: string): Promise<readonly IMovie[]>;
}

export interface IMovieResponse {
    page: number;
    movies: readonly IMovie[];
}
