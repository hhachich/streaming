import { useEffect,useState  } from 'react';
import ApiMovie from './ApiMovie';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([])


  useEffect(() => {
    const loadAllMovies = async () => {
      let list = await ApiMovie.getHomeMovies()
      setMoviesList(list)
      console.log(list)
    }

    loadAllMovies()
  }, [])

  return (
    <div className="App">
      <section className="lists">
        {moviesList.map((item, key) => (
          <p key={key}  >{item.title}</p>
        ))}
      </section>        
    </div>
  );
}

export default App;
