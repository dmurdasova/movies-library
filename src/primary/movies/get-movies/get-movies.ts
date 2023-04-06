import {
    DEFAULT_MOVIE_FILTER,
    IMovieFilter,
    IMovieRepository,
    IMovieResponse,
    INotificationService
} from 'src/domain/ports';
import { DEFAULT_ERROR, hasMessage } from '../../shared';

/**
 * Here we can get all the deps from the DI container
 * But to simplify the application, I decided to pass deps directly
 */
type Deps = {
    repository: IMovieRepository;
    notificationService: INotificationService;
};

export async function getMoviesUseCase(
    filter: IMovieFilter,
    page: number,
    deps: Deps
): Promise<IMovieResponse> {
    const { repository, notificationService } = deps;
    const mergedFilter = { ...DEFAULT_MOVIE_FILTER, ...filter };

    try {
        return await repository.get(mergedFilter, page);
    } catch (e) {
        const message = hasMessage(e) ? e.message : DEFAULT_ERROR;
        notificationService.notify(message, 'error');
        return { page: 1, movies: [] };
    }
}
