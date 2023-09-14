import { useLocation } from 'react-router-dom'
import './MoviesCard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MoviesCard({ name, src, trailerLink }) {
  const { pathname } = useLocation()
  const [click, setClick] = useState(false)

  function onClick() {
    if (click) {
      setClick(false)
    } else {
      setClick(true)
    }
  }
  return (
    <li className='gallery__card'>
      <article>
        <Link to={trailerLink} target='_blank'>
          <img src={src} alt="#" className='gallery__image' />
        </Link>
        <div className='gallery__card-group'>
          <div className='gallery__text-group'>
            <p className='gallery__subtitle'>{name}</p>
            <span className='gallery__duration'>1ч 47м</span>
          </div>
          {pathname === '/movies' ?
            <button type='button' className={`gallery__save ${click ? 'gallery__save_active' : ''}`} onClick={onClick}></button>
            :
            <button type='button' className={`gallery__save gallery__save_type_delete`} onClick={onClick}></button>
          }
        </div>
      </article>
    </li>
  )
}
