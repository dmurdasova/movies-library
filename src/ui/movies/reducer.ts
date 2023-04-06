import { IMovie } from '../../domain/entities';
import { DEFAULT_MOVIE_FILTER, IMovieFilter } from '../../domain/ports';

type State = {
    loading: boolean;
    filter: IMovieFilter;
    movies: readonly IMovie[];
};

type Request<S extends string> = `${Uppercase<S>}_REQUEST`;
type Pending<T extends Request<string>> = `${T}_PENDING`;
type Success<T extends Request<string>> = `${T}_SUCCESS`;

type MovieRequest = Request<'movie'>;

type MoviesActions = Pending<MovieRequest> | Success<MovieRequest>;

type FilterAction = 'FILTER_SETTING';

type ActionType = MoviesActions | FilterAction;

export interface IAction {
    type: ActionType;
    payload?: unknown;
}

export const initialState: State = {
    loading: false,
    filter: structuredClone(DEFAULT_MOVIE_FILTER),
    movies: []
};

const reducer = (state = initialState, action: IAction): State => {
    switch (action.type) {
        case 'MOVIE_REQUEST_PENDING':
            return <State>{ ...state, loading: true };
        case 'MOVIE_REQUEST_SUCCESS': {
            const movies = [...state.movies, ...(action.payload as IMovie[])];
            return <State>{ ...state, movies, loading: false };
        }
        case 'FILTER_SETTING':
            return <State>{ ...state, filter: action.payload as IMovieFilter, movies: [] };
        default:
            return state;
    }
};

export default reducer;
