import { IMovie } from 'src/domain/entities';
import { IMovieRepository, IMovieResponse, INotificationService } from 'src/domain/ports';
import { searchMoviesUseCase } from './search-movies';

describe('Search movies use case', () => {
    let repository: IMovieRepository;
    let notificationService: INotificationService;

    let mocks: IMovie[];

    beforeAll(() => {
        mocks = [
            {
                id: 1,
                title: 'BooFoo',
                rating: 5
            },
            { id: 2, title: 'Movie', rating: 3.8 },
            { id: 3, title: 'Bazz', rating: 4 }
        ];

        repository = {
            get(): Promise<IMovieResponse> {
                throw new Error('Mehtod not implemented');
            },
            getById() {
                throw new Error('Mehtod not implemented');
            },
            getRelatedMovies(): Promise<readonly IMovie[]> {
                throw new Error('Mehtod not implemented');
            },
            search(): Promise<readonly IMovie[]> {
                return Promise.resolve(mocks);
            }
        };

        notificationService = {
            notify(): void {
                return;
            }
        };
    });

    test('should return the array of movies by term', async () => {
        const service = jest.spyOn(repository, 'get');
        const term = 'foo';
        const data = await searchMoviesUseCase(term, { repository, notificationService });
        expect(service).toHaveBeenCalled();

        const reg = new RegExp(term);
        const filteredData = mocks.filter((m) => reg.test(m.title.toLowerCase()));
        expect(data).toBe(filteredData);
    });
});
