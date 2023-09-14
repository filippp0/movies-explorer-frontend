import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'
import Preloader from '../Preloader/Preloader'

export default function MoviesCardList({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstEntrance }) {
  const { pathname } = useLocation()
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)

  function printCards() {
    const counter = { init: 16, step: 4 }
    if (window.innerWidth < 1023) {
      counter.init = 8
      counter.step = 2
    }
    if (window.innerWidth < 650) {
      counter.init = 5
      counter.step = 2
    }
    return counter
  }

  function clickMore() {
    setCount(count + printCards().step)
  }

  return (
    <section className='gallery page__gallery'>
      <ul className='gallery__lists'>
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && fact.length !== 0) ?
            fact.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  savedMovies={savedMovies}
                  addMovie={addMovie}
                  data={data}
                />
              )
            }) : movies.length !== 0 ?
              movies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : serverError ?
                <span className='gallery__serch-error'>«Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз»
                </span>
                : !firstEntrance &&
                <span className='gallery__serch-error'>«Ничего не найдено»</span>
        }
      </ul>
      {pathname === '/movies' && <button type='button' className={`gallery__more ${count >= movies.length && 'gallery__more_hidden'}`} onClick={clickMore}>Ёще</button>}
    </section>
  )
}
