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


export default {
    getHomeMovies: async () => {
        return [
            {
              slug: "top-rated",
              title: "Mieux notés",
              items: await fetchMovies("movie/top_rated"),
            },
            {
                slug: "upcoming",
                title: "Prochaines sorties",
                items: await fetchMovies("movie/upcoming"),
            }, 
            {
                slug: "tvpopular",
                title: "Séries populaires",
                items: await fetchMovies("tv/popular"),
            },
        ]
    }   
}

