import { Card, Image, Rate, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IMovie } from '../../domain/entities';
import './Movie.scss';

export interface IMovieProps {
    item: IMovie;
    showDescription?: boolean;
}

const HEIGHT = '330px';
const WIDTH = '220px';

export function Movie({ item, showDescription = true }: IMovieProps): JSX.Element {
    const navigate = useNavigate();

    const openMovie = (): void => {
        navigate(`/${item.id}`);
    };

    return (
        <Card
            className="movie-card"
            title={
                <div className="movie-title" data-testid="title">
                    {item.title}
                </div>
            }
            hoverable
            onClick={openMovie}
        >
            <div className="movie-body">
                <div className="movie-body__image">
                    <Image width={WIDTH} height={HEIGHT} src={item.image} preview={false}></Image>
                </div>
                {showDescription && item.description && (
                    <Tooltip title={item.description}>
                        <div className="movie-body__info" data-testid="description">
                            {item.description}
                        </div>
                    </Tooltip>
                )}
                <div className="movie-body__footer">
                    <Rate allowHalf disabled value={item.votes ?? 0} />
                </div>
            </div>
        </Card>
    );
}
