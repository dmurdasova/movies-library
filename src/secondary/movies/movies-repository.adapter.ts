import { IMovie } from 'src/domain/entities';
import { IMovieFilter, IMovieRepository, IMovieResponse } from 'src/domain/ports';
import { IApiMovie, IApiResponse } from './apiResponse';

const BASE_URL = process.env.REACT_APP_API;
const API_KEY = process.env.REACT_APP_API_KEY;
const POSTER_URL = process.env.REACT_APP_IMAGE;
const POSTER_BIG_URL = process.env.REACT_APP_IMAGE_BIG;

const MOVIE_URL = `${BASE_URL}/movie`;
const SEARCH_URL = `${BASE_URL}/search/movie`;

const SORT_DISPATCHER = new Map<string, string>([
    ['popular', 'popular'],
    ['rating', 'top_rated']
]);

const addApiKey = (searchParams: URLSearchParams): void => {
    if (!API_KEY) {
        throw new Error('You have to set api key variable!');
    }

    searchParams.set('api_key', API_KEY);
};

const apiMovieMapper =
    (posterPath: string) =>
    (from: IApiMovie): IMovie => {
        const showPoster = posterPath && from.poster_path;
        return {
            id: from.id,
            title: from.title,
            description: from.overview,
            image: showPoster ? `${posterPath}${from.poster_path}` : undefined,
            rating: from.popularity,
            votes: Number((from.vote_average * 0.5).toFixed(2)),
            votesCount: from.vote_count,
            releaseDate: from.release_date,
            revenue: from.revenue,
            tag: from.tagline
        };
    };

const repository: IMovieRepository = {
    get: async (request: IMovieFilter, page: number): Promise<IMovieResponse> => {
        const path = SORT_DISPATCHER.get(request.sortType) ?? 'popular';
        const url = new URL(`${MOVIE_URL}/${path}`);
        addApiKey(url.searchParams);
        url.searchParams.append('page', page.toString());

        // Let's emulate waiting for a response
        await new Promise((res) => {
            setTimeout(() => res(null), 1500);
        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = (await response.json()) as IApiResponse;

        const { results } = data;

        const mapper = apiMovieMapper(POSTER_URL ?? '');

        return {
            page: data.page,
            movies: results.map((apiMovie: IApiMovie) => mapper(apiMovie))
        };
    },
    getById: async (id): Promise<IMovie> => {
        const url = new URL(`${MOVIE_URL}/${id}`);
        addApiKey(url.searchParams);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = (await response.json()) as IApiMovie;
        const mapper = apiMovieMapper(POSTER_BIG_URL ?? '');
        const result = mapper(data);

        return result;
    },
    getRelatedMovies: async (id: number): Promise<readonly IMovie[]> => {
        const url = new URL(`${MOVIE_URL}/${id}/similiar`);
        addApiKey(url.searchParams);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = (await response.json()) as IApiResponse;

        const mapper = apiMovieMapper(POSTER_URL ?? '');
        const result = data.results.map((apiMovie: IApiMovie) => mapper(apiMovie));

        return result;
    },
    search: async (term: string): Promise<readonly IMovie[]> => {
        const url = new URL(`${SEARCH_URL}`);
        addApiKey(url.searchParams);
        url.searchParams.append('query', encodeURI(term));

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error();
        }

        const data = (await response.json()) as IApiResponse;
        const result = data.results.map((apiMovie: IApiMovie) => apiMovieMapper('')(apiMovie));

        return result;
    }
};

export function useCookieRepositoryService(): IMovieRepository {
    return repository;
}
