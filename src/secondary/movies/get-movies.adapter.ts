import { useCallback } from 'react';
import { IMovieFilter, IMovieResponse } from 'src/domain/ports';
import { getMoviesUseCase } from 'src/primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './movies-repository.adapter';

export function useGetMovies(): (filter: IMovieFilter, page: number) => Promise<IMovieResponse> {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(
        (filter: IMovieFilter, page: number) => {
            return getMoviesUseCase(filter, page, { repository, notificationService });
        },
        [repository, notificationService]
    );

    return callback;
}
