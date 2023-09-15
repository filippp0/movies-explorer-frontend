import { useContext } from 'react'
import './Form.css'
import Preloader from '../Preloader/Preloader'
import ErrorContext from '../../contexts/ErrorContext'
import SendContext from '../../contexts/SendContext'
import { useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useLocation } from 'react-router-dom'

export default function Form({ name, children, isValid, onSubmit, setIsError, values, isSuccess, setSuccess }) {
  const { pathname } = useLocation()
  const isError = useContext(ErrorContext)
  const isSend = useContext(SendContext)
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setIsError(false)

  }, [setIsError, values])

  useEffect(() => {
    if (pathname === '/profile') {
      setSuccess(false)
    }
  }, [setSuccess, pathname])

  console.log(setSuccess)
  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-request ${isError && 'profile__error-request_active'}`}>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-request login__error-request_type_reg ${isError && 'profile__error-request_active'}`}>{'При регистрации произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend}
            >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          :
          <>
            <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
            <button
              type="submit"
              className={`profile__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid ? 'profile__submit_disabled' : ''}`}
              disabled={!isValid || isSend}
            >{isSend ? <Preloader name='button-small' /> : 'Редактировать'}</button>
          </>
      }
    </form>
  )
}
