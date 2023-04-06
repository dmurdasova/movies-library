import { IMovie } from 'src/domain/entities';
import {
    IMovieFilter,
    IMovieRepository,
    IMovieResponse,
    INotificationService
} from 'src/domain/ports';
import { getMoviesUseCase } from './get-movies';

describe('Get movies use case', () => {
    let repository: IMovieRepository;
    let notificationService: INotificationService;

    let filter: IMovieFilter;
    let mocks: IMovie[];

    beforeAll(() => {
        filter = {} as IMovieFilter;

        mocks = [
            {
                id: 1,
                title: 'Movie1',
                description: 'Movie1 description',
                rating: 5
            },
            { id: 2, title: 'Movie2', rating: 3.8 },
            { id: 3, title: 'Movie3', rating: 4 }
        ];

        repository = {
            get(): Promise<IMovieResponse> {
                return Promise.resolve({ page: 1, movies: mocks });
            },
            getById() {
                throw new Error('Mehtod not implemented');
            },
            getRelatedMovies(): Promise<readonly IMovie[]> {
                throw new Error('Mehtod not implemented');
            },
            search(): Promise<readonly IMovie[]> {
                throw new Error('Mehtod not implemented');
            }
        };

        notificationService = {
            notify(): void {
                return;
            }
        };
    });

    test('should return the array of movies', async () => {
        const service = jest.spyOn(repository, 'get');
        const data = await getMoviesUseCase(filter, 1, { repository, notificationService });
        expect(service).toHaveBeenCalled();
        expect(data).toBe(mocks);
    });
});
