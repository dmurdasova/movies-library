import { IIdentifiable } from '..';

export interface IMovie extends IIdentifiable {
    title: string;
    description?: string;
    image?: string;
    rating: number | null;
    votes?: number;
    votesCount?: number;
    releaseDate?: string;
    revenue?: number;
    tag?: string;
}
