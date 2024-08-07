import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MovieSection.css";
import YouTube from 'react-youtube';
import ApiMovie from "../ApiMovie";

// model affichage du carrousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const opts = {
  height: '390px',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    modestbranding: 1,
    controls: 2,
  },
};

const MovieSection = ({ title, items, typeVideo }) => {
  console.log("MovieSection ")
  console.log("title ", title)
  console.log("items ", items)
  console.log("typeVideo ", typeVideo)


  const [trailerURL, setTrailerURL] = useState("");
  const [descriptionMovie, setDescriptionMovie] = useState('');
  const [titleMovie, setTitleMovie] = useState('');
  const [originalTitleMovie, setOriginalTitleMovie] = useState('');

  const handleClickDetails = async (movie) => {

    console.log("handleClickDetails");
    if (trailerURL) {
      console.log("trailerURL true")
      setTrailerURL('');
      setDescriptionMovie('');
      setTitleMovie('');
      setOriginalTitleMovie('');
    } else {
      console.log("movie", movie);

      let listTrailer = await ApiMovie.getTrailer(movie.id, typeVideo);
      const path = listTrailer[0].key;
      setDescriptionMovie(movie.overview);
      setTitleMovie(movie.name || movie.title);
      setOriginalTitleMovie(movie.original_name || movie.original_title);
      console.log("path ", path)
      setTrailerURL(path);
    }
  }
  return (
    <div className="body">
      <h2>{title}</h2>

      <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {items.results &&
          items.results.map((item, key) => (
            <div className="slider" key={key}>
              <img
                alt={item.original_title}
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                onClick={() => handleClickDetails(item)}
              />
            </div>
          ))}

      </Carousel>
      {trailerURL && <div className="info__overlay" onClick={() => handleClickDetails(null)}>
        <div className="info__overlay--contentBox" onClick={(e) => e.stopPropagation()}>

          <div className="info__overlay--videoBox">
            <YouTube videoId={trailerURL} opts={opts} />
          </div>
          <div className="info__overlay--text">
            <h1>{titleMovie}</h1>
            <h2>{originalTitleMovie ? `(${originalTitleMovie})` : ''}</h2>
            <p>{descriptionMovie}</p>
          </div>
        </div>
      </div>
      }


    </div>
  );
};
export default MovieSection;
