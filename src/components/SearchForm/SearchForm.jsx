import { useState } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import './SearchForm.css'

export default function SearchForm({ isCheck, changeShot }) {
  const [isError,setIsError] = useState(false)
  const {values, isValid, handleChange} = useFormValidation()

  function onSubmit(evt) {
    evt.preventDefault()
    if (!isValid) {
      setIsError(true)
      return
    } else {
      setIsError(false)
    }
  }

  return (
    <section className='search page__search'>
      <div className='search__container'>
        <form noValidate className='search__form' name={'SearchForm'} value={values.search} onSubmit={onSubmit}>
          <input type="text" placeholder='Фильм' className='search__input' required onChange={handleChange}/>
          <button className='search_submit'></button>
        </form>
        <span className={`search__error ${isError && 'search__error_active'}`}>{isError ? 'Введите ключевое слово' : ''}</span>
        <FilterCheckbox isCheck={isCheck} changeShot={changeShot}/>
      </div>
    </section>
  )
}
