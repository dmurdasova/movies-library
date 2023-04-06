import { useCallback } from 'react';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './movies-repository.adapter';
import { IMovie } from 'src/domain/entities';
import { searchMoviesUseCase } from 'src/primary/movies/search/search-movies';

export function useSearchMovies(): (term: string) => Promise<readonly IMovie[]> {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(
        (term: string) => {
            return searchMoviesUseCase(term, { repository, notificationService });
        },
        [repository, notificationService]
    );

    return callback;
}
