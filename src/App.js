import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MovieSearch from './components/MovieSearch';

function App() {


  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="home"
          element={<Home />}
        />
        <Route path="search" element={<MovieSearch />} />
      </Routes>

    </div >
  );
}

export default App;
