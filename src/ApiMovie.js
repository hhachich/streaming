const API_KEY= process.env.REACT_APP_API_KEY
const API_URL= process.env.REACT_APP_API_URL

const fetchMovies = async (endpoint) => {
    return await fetch(
      `${API_URL}${endpoint}?language=fr-FR`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
      
    ).then((response) => response.json())
  }
  const fetchTrailer = async (endpoint) => {
    return await fetch(
      `${API_URL}${endpoint}?language=en-US`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
      }
      
    ).then((response) => response.json())
  }

export default {
    getHomeMovies: async () => {
        return [
            {
              slug: "top-rated",
              title: "Film mieux notés",
              items: await fetchMovies("movie/top_rated"),
              typeVideo: "movie",
            },
            {
              slug: "tv-toprated",
              title: "Série bien notées",
              items: await fetchMovies("tv/top_rated"),
              typeVideo: "tv",
            },
            {
                slug: "upcoming",
                title: "Prochaines sorties",
                items: await fetchMovies("movie/upcoming"),
                typeVideo: "movie",
            }, 
            {
                slug: "tvpopular",
                title: "Séries populaires",
                items: await fetchMovies("tv/popular"),
                typeVideo: "tv",
            },
        ]
    },
    getMovieInfo: async (movieId, type) => {
      let info = []
      if (movieId) {
        switch (type) {
          case "movie":
            info = await fetchMovies(`movie/${movieId}`)
            break
          case "tv":
            info = await fetchMovies(`tv/${movieId}`)
            break
  
          default:
            break
        }
      }
      return info
    },
    getTrailer: async (movieId,type) => {
      let info = []   
      if (movieId) {
        switch (type) {
          case "movie":
            info = await fetchTrailer(`movie/${movieId}/videos`)
            break
          case "tv":
            info = await fetchTrailer(`tv/${movieId}/videos`)
            break
  
          default:
            break
        }
      }
      let trailersVideo=info.results.filter((trailers) => trailers.type === "Trailer");
      return trailersVideo
    },      
}

