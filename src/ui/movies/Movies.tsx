import { Button, Col, FloatButton, Layout, Row, Space, Spin } from 'antd';
import React, { useEffect, useReducer, useId, useState } from 'react';
import { IMovie } from 'src/domain/entities';
import useInfiniteScroll from 'src/secondary/infinity-scroll/infinity-scroll';
import { IMovieFilter, SortType } from '../../domain/ports';
import { useGetMovies } from '../../secondary';
import { Movie } from '../movie/Movie';
import './Movies.scss';
import reducer, { initialState } from './reducer';

const { Header, Content, Footer } = Layout;

function Movies(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [active, setActive] = useState<SortType>('popular');

    const { filter, movies, loading } = state;

    const [page, lastElement, resetPage] = useInfiniteScroll();
    const loadMovies = useGetMovies();

    const id = useId();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'MOVIE_REQUEST_PENDING' });
            const { movies: payload } = await loadMovies(filter, page);
            dispatch({ type: 'MOVIE_REQUEST_SUCCESS', payload });
        };

        fetchData();
    }, [filter, page, loadMovies]);

    const handleFilterChange = (type: SortType): void => {
        const payload = structuredClone(filter) as IMovieFilter;
        payload.sortType = type;

        resetPage();
        setActive(type);
        dispatch({ type: 'FILTER_SETTING', payload });
    };

    return (
        <Layout style={{ height: '100%' }}>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Space wrap>
                    <Button
                        type={active === 'popular' ? 'primary' : 'default'}
                        onClick={() => handleFilterChange('popular')}>
                        Popular
                    </Button>
                    <Button
                        type={active === 'rating' ? 'primary' : 'default'}
                        onClick={() => handleFilterChange('rating')}>
                        Order by rating
                    </Button>
                </Space>
            </Header>

            <Content className="movies-container" style={{ padding: '25px' }}>
                <Row gutter={30} className="movies-container__content">
                    {movies.map((m: IMovie) => {
                        return (
                            <Col key={m.id} span={6}>
                                <Movie key={m.id} item={m}></Movie>
                            </Col>
                        );
                    })}
                </Row>
            </Content>

            {!loading && movies.length && <div key={id} ref={lastElement}></div>}

            <FloatButton.BackTop></FloatButton.BackTop>

            <Footer style={{ textAlign: 'center' }}>
                Movie Library ©2023 Created by Diana Murdasova
            </Footer>

            {loading && (
                <div className="spinner-container">
                    <Spin size="large" />
                </div>
            )}
        </Layout>
    );
}

export default Movies;
