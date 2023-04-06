import { Button, Carousel, Image, Rate, Tooltip } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IMovie } from 'src/domain/entities';
import { useGetRelatedMovies } from 'src/secondary';
import { useGetById } from 'src/secondary/movies/get-by-id.adapter';
import { Movie } from '../movie/Movie';
import './MoviePage.scss';
import { useNavigate } from 'react-router-dom';

function MoviePage(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState<IMovie | null>(null);
    const [relatedMovies, setRelatedMovies] = useState<readonly IMovie[]>([]);

    const loadMovie = useGetById();
    const loadRelatedMovies = useGetRelatedMovies();

    const goBack = (): void => {
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadMovie(Number(id));
            setDetails(data);
        };

        fetchData();
    }, [id, loadMovie]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadRelatedMovies(Number(id));
            setRelatedMovies(data);
        };

        fetchData();
    }, [id, loadRelatedMovies]);

    if (!details) {
        return <></>;
    }

    return (
        <section className="movie-page-container">
            <Tooltip title="Go back">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<ArrowLeftOutlined />}
                    onClick={goBack}
                />
            </Tooltip>

            <section className="movie-page-container__content">
                <div className="movie-page-container__image">
                    <Image width={350} src={details.image} />
                </div>
                <div className="movie-page-container__info">
                    <h3>{details.title}</h3>
                    <Rate allowHalf disabled value={details.votes ?? 0} />
                    <br></br>
                    <i>Voted: {details.votesCount}</i>
                    <div className="movies-page-container__info-desc">{details.description}</div>
                </div>
            </section>

            <section className="movie-page-container__related">
                <Carousel>
                    {relatedMovies.map((m) => (
                        <Movie key={m.id} item={m} showDescription={false}></Movie>
                    ))}
                </Carousel>
            </section>
        </section>
    );
}

export default MoviePage;
