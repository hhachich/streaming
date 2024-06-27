import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MovieSection.css";
// import ApiMovie from "../ApiMovie";
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
  const [trailerURL, setTrailerURL] = useState("");
  const [descriptionMovie, setDescriptionMovie] = useState('');
  const [titleMovie, setTitleMovie] = useState('');
  const [originalTitleMovie, setOriginalTitleMovie] = useState('');

  const handleClick2 = async (movie) => {

    console.log("handleClick2");
    if (trailerURL) {
      console.log("trailerURL true")
      setTrailerURL('');
      setDescriptionMovie('');
      setTitleMovie('');
      setOriginalTitleMovie('');
    } else {
    console.log("movie", movie);

    let list = await ApiMovie.getTrailer(movie.id, typeVideo);
    console.log("list", list[0].key);
    const path = list[0].key;
    setDescriptionMovie(movie.overview);
    setTitleMovie(movie.name || movie.title);
    setOriginalTitleMovie(movie.original_name || movie.original_title);
    setTrailerURL(path);
    }
  }
  return (
    <div className="parent">
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
        {items.results.length > 0 &&
          items.results.map((item, key) => (
            <div className="slider" key={key}>
              <img
                alt={item.original_title}
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                onClick={() => handleClick2(item)}
              />
              {/*  */}
            </div>
          ))}

      </Carousel>
      {trailerURL && <div className="info__overlay" onClick={() => handleClick2(null)}>
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
