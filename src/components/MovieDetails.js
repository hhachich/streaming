import React, { useEffect, useState } from 'react';
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
function MovieDetails({ movie, typeVideo }) {
    console.log("movie : ", movie);
    console.log("typeVideo : ", typeVideo);

    const [trailerURL, setTrailerURL] = useState("");
    const [descriptionMovie, setDescriptionMovie] = useState('');
    const [titleMovie, setTitleMovie] = useState('');
    const [originalTitleMovie, setOriginalTitleMovie] = useState('');
    useEffect(() => {
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
    
                let list = await ApiMovie.getTrailer(movie.id, typeVideo);
                console.log("list", list[0].key);
                const path = list[0].key;
                setDescriptionMovie(movie.overview);
                setTitleMovie(movie.name || movie.title);
                setOriginalTitleMovie(movie.original_name || movie.original_title);
                setTrailerURL(path);
            }
        }
        handleClickDetails(movie)
    }, [])

    return (
        <>
            {trailerURL && <div className="info__overlay" >
                <div className="info__overlay--contentBox">

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

        </>


    );
};

export default MovieDetails;