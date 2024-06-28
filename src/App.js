import { useEffect,useState  } from 'react';
import ApiMovie from './ApiMovie';
import './App.css';
import MovieSection from './components/MovieSection';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import MovieSearch from './components/MovieSearch';

function App() {
  const [moviesList, setMoviesList] = useState([])
  const [featuredData, setfeaturedData] = useState(null)


  useEffect(() => {
    const loadAllMovies = async () => {
      // list de tous les films que nous avous definis dans ApiMovie
      let list = await ApiMovie.getHomeMovies()
      setMoviesList(list)
      // choisr un seul film a l'affiche de la list top-rated
      let originals = list.filter((oneMovie) => oneMovie.slug === "top-rated")
      // grace Math.random  choisir un nb aleatoire et l arrondir grace Math.floor
      let chooseRandomMovie = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      )
      let chosen = originals[0].items.results[chooseRandomMovie]
      let chosenInfo = await ApiMovie.getMovieInfo(chosen.id, "movie")
      setfeaturedData(chosenInfo)

    }

    loadAllMovies()
  }, [])

  return (
    <div className="page">


      <Header />
       {featuredData && <FeaturedMovie films={featuredData} />}
       <MovieSearch/>
      <section className="lists">
        {moviesList.map((item, key) => (
          <MovieSection key={key} title={item.title} items={item.items} typeVideo={item.typeVideo}/>
        ))}
      </section>        
    </div>
  );
}

export default App;
