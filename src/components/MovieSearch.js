import React, { useState } from 'react';
import "./MovieSearch.css"
import ApiMovie from '../ApiMovie';
import MovieGrid from './MovieGrid';
import Categorie from './Categorie';
const MovieSearch = () => {

    const [keyword, setKeyword] = useState("");
    const [listMovie, setListMovie] = useState([]);

    const handleInputChange = async (e) => {
        console.log("handleInputChange")
        console.log("e ", e)
        const term = e.target.value;
        setKeyword(term);
        console.log("term ", term)
        console.log("keyword ", keyword)
        if (term.length <= 1) {
            setListMovie([]);
            return;
        }

        let listSearch = await ApiMovie.getSearch(term, "movie");
        setListMovie(listSearch)
        console.log("listSearch", listSearch)
        console.log("listMovie", listMovie)
    }

    return (
        <div className="movie-search">
            <Categorie />
            <input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => handleInputChange(e)}
            />
            <section className="lists">
                {listMovie.results && <div>
                    <MovieGrid title="search section" items={listMovie} typeVideo="movies" />
                </div>
                }
            </section>

        </div>

    );
};

export default MovieSearch;