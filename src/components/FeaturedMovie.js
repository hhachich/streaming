import React, { useState } from "react"
import "./FeaturedMovie.css"
import YouTube from 'react-youtube';
import ApiMovie from "../ApiMovie";

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


function FeaturedMovie({ films }) {
  console.log("FILM", films)

  const [trailerURL, setTrailerURL] = useState("");

  const handleClickDetails = async (movie) => {

    console.log("handleClickDetails");
    if (trailerURL) {
      console.log("trailerURL true")
      setTrailerURL('');
    } else {
      let list = await ApiMovie.getTrailer(movie.id, "movie");
      const path = list[0].key;

      setTrailerURL(path);
    }
  }

  let genres = []
  for (let genre of films.genres) {
    genres.push(genre.name)
  }


  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${films.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{films.title} </div>
          <div className="featured--info">
            <div className="featured--points">
              {films.vote_average.toFixed(2)}
            </div>
            <div className="featured--year">{films.release_date}</div>
          </div>
          <div className="featured--description">{films.overview}</div>
          <div className="featured--button">
            <buttom className="featured--watchbutton" onClick={() => handleClickDetails(films)}>
              Bande annonce
            </buttom>
            <a href="/" className="featured--mylistbutton">
              + Ma Liste
            </a>
          </div>
          <div className="featured--genres">
            <strong>Genres</strong> : {genres.join(", ")}
          </div>
        </div>
      </div>

      {trailerURL && <div className="info__overlay" onClick={() => handleClickDetails(null)}>
        <div className="info__overlay--contentBox" onClick={(e) => e.stopPropagation()}>
          <div className="info__overlay--videoBox">
            <YouTube videoId={trailerURL} opts={opts} />
          </div>
        </div>
      </div>
      }
    </section>
  )
}

export default FeaturedMovie