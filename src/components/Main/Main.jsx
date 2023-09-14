import './Main.css'
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error'
import Profile from '../Profile/Profile';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies, saveMovies } from '../../utils/constants'
import { useEffect, useState } from 'react';

export default function Main({ name, setLoggedIn }) {
  const [moviesAll, setMoviesAll] = useState([])
  const [saveMovie, setSaveMovie] = useState([])
  const [isCheckMoviesAll, setIsCheckMoviesAll] = useState(true)
  const [isCheckMoviesSave, setIsCheckMoviesSave] = useState(true)

  useEffect(() => {
    setMoviesAll(movies)
    setSaveMovie(saveMovies)
  }, [])

  function onCheckMoviesAll() {
    if (isCheckMoviesAll) {
      setIsCheckMoviesAll(false)

      setMoviesAll(moviesAll.filter((element) => element.duration <= 40))
    } else {
      setIsCheckMoviesAll(true)
      setMoviesAll(movies)
    }
  }

  function onCheckMoviesSave() {
    if (isCheckMoviesSave) {
      setIsCheckMoviesSave(false)
      setSaveMovie(saveMovie.filter((element) => element.duration <= 40))
    } else {
      setIsCheckMoviesSave(true)
      setSaveMovie(saveMovies)
    }
  }

  return (
    <main className="main">
      {{
        home:
          <>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </>,
        signin: <Login name={name} setLoggedIn={setLoggedIn} />,
        signup: <Register name={name} setLoggedIn={setLoggedIn} />,
        error: <Error />,
        profile: <Profile name={name} setLoggedIn={setLoggedIn} />,
        movies:
          <>
            <SearchForm isCheck={isCheckMoviesAll} changeShot={onCheckMoviesAll} />
            <MoviesCardList movies={moviesAll} />
          </>,
        savedmovies:
          <>
            <SearchForm isCheck={isCheckMoviesSave} changeShot={onCheckMoviesSave} />
            <MoviesCardList movies={saveMovie} />
          </>
      }[name]}
    </main>
  )
}
