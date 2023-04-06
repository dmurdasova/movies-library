import { IMovie } from 'src/domain/entities';
import { IMovieRepository, IMovieResponse, INotificationService } from 'src/domain/ports';
import { getRelatedMoviesUseCase } from './get-related-movies';

describe('Get related movies use case', () => {
    let repository: IMovieRepository;
    let notificationService: INotificationService;

    let mocks: IMovie[];

    beforeAll(() => {
        mocks = [
            {
                id: 1,
                title: 'Related Movie1',
                rating: 5
            },
            { id: 2, title: 'Movie2', rating: 3.8 },
            { id: 3, title: 'Movie3', rating: 4 }
        ];

        repository = {
            get(): Promise<IMovieResponse> {
                throw new Error('Mehtod not implemented');
            },
            getById() {
                throw new Error('Mehtod not implemented');
            },
            getRelatedMovies(): Promise<readonly IMovie[]> {
                return Promise.resolve(mocks);
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

    test('should return the array of related movies', async () => {
        const service = jest.spyOn(repository, 'get');
        const id = 1;
        const data = await getRelatedMoviesUseCase(id, { repository, notificationService });
        expect(service).toHaveBeenCalled();
        expect(data).toBe(mocks);
    });
});
