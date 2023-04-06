import { useCallback } from 'react';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './movies-repository.adapter';
import { IMovie } from 'src/domain/entities';
import { getRelatedMoviesUseCase } from 'src/primary/movies/get-related-movies/get-related-movies';

export function useGetRelatedMovies(): (id: number) => Promise<readonly IMovie[]> {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(
        (id: number) => {
            return getRelatedMoviesUseCase(id, { repository, notificationService });
        },
        [repository, notificationService]
    );

    return callback;
}
