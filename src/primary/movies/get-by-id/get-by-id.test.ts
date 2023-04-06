import { IMovie } from 'src/domain/entities';
import { IMovieRepository, IMovieResponse, INotificationService } from 'src/domain/ports';
import { getMovieByIdUseCase } from './get-by-id';

describe('Get movies use case', () => {
    let repository: IMovieRepository;
    let notificationService: INotificationService;

    let mock: IMovie;

    beforeAll(() => {
        mock = {
            id: 1,
            title: 'Movie1',
            description: 'Movie1 description',
            rating: 5
        };

        repository = {
            get(): Promise<IMovieResponse> {
                throw new Error('Mehtod not implemented');
            },
            getById() {
                return Promise.resolve(mock);
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

    test('should return the movie by its id', async () => {
        const service = jest.spyOn(repository, 'get');
        const data = await getMovieByIdUseCase(1, { repository, notificationService });
        expect(service).toHaveBeenCalled();
        expect(data).toBe(mock);
    });
});
