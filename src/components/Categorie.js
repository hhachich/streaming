import React, { useState, useEffect } from 'react';
import "./Categorie.css"
const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL = "https://api.themoviedb.org/3/movie/top_rated";

const Categorie = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async (page) => {
            console.warn("fetchMovies page", page)

            const response = await fetch(
                `${BASE_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            })
            const data = await response.json();
            console.log("fetchMovies data", data)
            setMovies(data.results);
            setCurrentPage(data.page);
            setTotalPages(data.total_pages);
        };
        fetchMovies(currentPage);
        console.log("currentPage Modify", currentPage)

    }, [currentPage]);



    const goToNextPage = () => {
        if (currentPage < totalPages) {
            console.log("goToNextPage")
            setCurrentPage(currentPage + 1);
        }
        console.log("currentPage goToNextPage", currentPage)

    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            console.log("goToPreviousPage")

            setCurrentPage(currentPage - 1);
        }
        console.log("currentPage goToPreviousPage", currentPage)

    };
    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            })
            const data = await response.json();
            setGenres(data.genres);
        };
        const fetchTopRated = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                },
            })
            const data = await response.json();
            const totalPages = data.total_pages;

            console.log("data results", data.results)

            setMovies(data);
        };
        fetchGenres();
        fetchTopRated();
        console.log("movies", movies)
        console.log("genres", genres)
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            if (selectedGenre) {
                console.log("selectedGenre")
                const response =
                    await fetch(
                        `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${API_KEY}`,
                        },
                    })
                const data = await response.json();
                setMovies(data);
            }
        };
        fetchMovies();
        console.log("movies", movies)
    }, [selectedGenre]);

    const handleCategoryClick = (genreId) => {
        setSelectedGenre(genreId);

    };

    return (
        <>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <div className="movie-grid">
                {movies.results && movies.results.map((item, key) => (
                    <div key={key}>
                        <img
                            alt={item.original_title}
                            src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                        />
                    </div>
                ))}
            </div>
            <div className="category-container">
                {genres && genres.map((genre) => (
                    <div key={genre.id} className="category-oval" onClick={() => handleCategoryClick(genre.id)}>
                        {genre.name}
                    </div>
                ))
                }
            </div >
            {/* <div className="movie-grid">
                {movies.results &&
                    movies.results.map((item, key) => (
                        <div key={key}>
                            <img
                                alt={item.original_title}
                                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}

                            />
                        </div>
                    ))}
            </div> */}
        </>
    );
};

export default Categorie;