export interface IApiMovie {
    poster_path: string | null;
    id: number;
    title: string;
    overview: string;
    popularity: number;
    vote_average: number;
    vote_count?: number;
    release_date?: string;
    revenue?: number;
    tagline?: string;
}

export interface IApiResponse {
    page: number;
    results: readonly IApiMovie[];
}
