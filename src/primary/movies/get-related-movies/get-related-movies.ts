import { IMovie } from 'src/domain/entities';
import { IMovieRepository, INotificationService } from 'src/domain/ports';
import { DEFAULT_ERROR, hasMessage } from '../../shared';

/**
 * Here we can get all the deps from the DI container
 * But to simplify the application, I decided to pass deps directly
 */
type Deps = {
    repository: IMovieRepository;
    notificationService: INotificationService;
};

export async function getRelatedMoviesUseCase(id: number, deps: Deps): Promise<readonly IMovie[]> {
    const { repository, notificationService } = deps;

    try {
        return await repository.getRelatedMovies(id);
    } catch (e) {
        const message = hasMessage(e) ? e.message : DEFAULT_ERROR;
        notificationService.notify(message, 'error');
        return [];
    }
}
