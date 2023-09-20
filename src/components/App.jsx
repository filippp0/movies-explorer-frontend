import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useCallback, useEffect, useState } from 'react';
import apiMain from '../utils/MainApi';
import SendContext from '../contexts/SendContext';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ErrorContext from '../contexts/ErrorContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedPage from './ProtectedPage/ProtectedPage';
import Preloader from './Preloader/Preloader';

function App() {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [isSend, setIsSend] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isError, setIsError] = useState(false)
  const [isCheckToken, setIsCheckToken] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([apiMain.getUserData(localStorage.jwt), apiMain.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse())
          setCurrentUser(userData)
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((err) => {
          console.error(`Ошибка при загрузке начальных данных ${err}`)
          setIsCheckToken(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsCheckToken(false)
    }
  }, [loggedIn])

  const setSuccess = useCallback(() => {
    setIsSuccess(false)
  }, [])

  function handleDeleteMovie(deletemovieId) {
    apiMain.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }

  function handleToggelMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id)
    } else {
      apiMain.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }

  function handleLogin(email, password) {
    setIsSend(true)
    apiMain.authorization(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/movies')
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(username, email, password) {
    setIsSend(true)
    apiMain.registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false)
          apiMain.authorization(email, password)
            .then(res => {
              localStorage.setItem('jwt', res.token)
              setLoggedIn(true)
              navigate('/movies')
              window.scrollTo(0, 0)
            })
            .catch((err) => {
              setIsError(true)
              console.error(`Ошибкак при авторизации после регистрации ${err}`)
            })
            .finally(() => setIsSend(false))
        }
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function logOut() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  function editUserData(username, email) {
    setIsSend(true)
    apiMain.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        setIsSuccess(true)
        setIsEdit(false)
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <div className="page__container">
      {isCheckToken ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
          <SendContext.Provider value={isSend}>
            <ErrorContext.Provider value={isError}>
              <Routes>

                <Route path='/signin' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signin' onLogin={handleLogin} setIsError={setIsError} />
                } />

                <Route path='/signup' element={
                  loggedIn ? <Navigate to='/movies' replace /> :
                    <Main name='signup' onRegister={handleRegister} setIsError={setIsError} />
                } />

                <Route path='/profile' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='profile'
                  loggedIn={loggedIn}
                  logOut={logOut}
                  editUserData={editUserData}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  setIsEdit={setIsEdit}
                  isEdit={isEdit}
                />
                } />

                <Route path='/' element={
                  <>
                    <Header name='home' loggedIn={loggedIn} />
                    <Main name='home' />
                    <Footer />
                  </>
                } />

                <Route path='/movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='movies'
                  savedMovies={savedMovies}
                  addMovie={handleToggelMovie}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path='/saved-movies' element={<ProtectedRoute
                  element={ProtectedPage}
                  name='savedmovies'
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path='*' element={
                  <>
                    <Main name='error' />
                  </>
                } />

              </Routes>
            </ErrorContext.Provider>
          </SendContext.Provider>
        </CurrentUserContext.Provider>
      }
    </div>
  );
}

export default App;
