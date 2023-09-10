import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import { useState } from 'react'

export default function MoviesCardList({ movies }) {
  const [count, setCount] = useState(printCards().init)
  const fact = movies.slice(0, count)

  function printCards() {
    const counter = { init: 16, step: 4}
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
        {fact.map(data => {
          return (
            <MoviesCard key={data.id} name={data.name} src={data.image} trailerLink={data.trailerLink}/>
          )
        })}
      </ul>
      <button type='button' className={`gallery__more ${count >= movies.length && 'gallery__more_hidden'}`} onClick={clickMore}>Ёще</button>
    </section>
  )
}
