import { useCallback } from 'react';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './movies-repository.adapter';
import { IMovie } from 'src/domain/entities';
import { getMovieByIdUseCase } from 'src/primary/movies/get-by-id/get-by-id';

export function useGetById(): (id: number) => Promise<IMovie | null> {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(
        (id: number) => {
            return getMovieByIdUseCase(id, { repository, notificationService });
        },
        [repository, notificationService]
    );

    return callback;
}
