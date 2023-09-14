import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import ErrorContext from '../../contexts/ErrorContext'
import './SearchForm.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import useFormValidation from '../../hooks/useFormValidation'

export default function SearchForm({ isCheck, changeShort, searchedMovie, searchMovies, setIsError }) {
  const isError = useContext(ErrorContext)
  const { values, handleChange, reset } = useFormValidation()

  useEffect(() => {
    reset({ search: searchedMovie })
    setIsError(false)
  }, [searchedMovie, reset, setIsError])

  function onSubmit(evt) {
    evt.preventDefault()
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  return (
    <section className='search page__search'>
      <div className='search__container'>
        <form noValidate className='search__form' name={'SearchForm'} onSubmit={onSubmit}>
          <input
            type="text"
            name='search'
            placeholder='Фильм'
            className='search__input'
            value={values.search || ''}
            onChange={handleChange}
            required
          />
          <button className='search_submit'></button>
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>{'Введите ключевое слово'}</span>
        <FilterCheckbox isCheck={isCheck} changeShort={changeShort} />
      </div>
    </section>
  )
}
