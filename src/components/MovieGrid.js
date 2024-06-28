import React from 'react';
import './MovieGrid.css';

const MovieGrid = ({ title, items, typeVideo }) => {
    console.log("MovieGrid ")
    console.log("title ", title)
    console.log("items ", items)
    console.log("typeVideo ", typeVideo)
    return (
        <div className="parent">
            <h2>{title}</h2>
            <div className="movie-grid">
                {items.results &&
                    items.results.map((item, key) => (
                        <div key={key}>
                            <img
                                alt={item.original_title}
                                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}

                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MovieGrid;