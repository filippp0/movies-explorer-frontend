import { useContext } from 'react'
import './Form.css'
import Preloader from '../Preloader/Preloader'
import ErrorContext from '../../contexts/ErrorContext'
import SendContext from '../../contexts/SendContext'
import { useEffect } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { useLocation } from 'react-router-dom'

export default function Form({ name, children, isValid, onSubmit, setIsError, values, isSuccess, setSuccess, setIsEdit, isEdit }) {
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
      setIsEdit(false)
    }
  }, [setSuccess, setIsEdit, pathname])

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === 'signin' ?
        <>
          <span className={`login__error-request ${isError && 'login__error-request_active'}`}>{'При входе произошла ошибка.'}</span>
          <button
            type="submit"
            className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
            disabled={!isValid || isSend || isError}
          >{isSend ? <Preloader name='button' /> : 'Войти'}</button>
        </>
        :
        name === 'signup' ?
          <>
            <span className={`login__error-request login__error-request_type_reg ${isError && 'login__error-request_active'}`}>{'При регистрации произошла ошибка.'}</span>
            <button
              type="submit"
              className={`login__submit ${isValid && !isError ? '' : 'login__submit_disabled'}`}
              disabled={!isValid || isSend || isError}
            >{isSend ? <Preloader name='button' /> : 'Зарегистрироваться'}</button>
          </>
          : !isEdit ?
            <>
              <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(true)
                  setSuccess(false)
                }}
              >{'Редактировать'}</button>
            </> :
            <>
              <span className={`profile__error-request ${isError ? 'profile__error-request_type_error' : isSuccess && 'profile__error-request_type_success'}`}>{isError ? 'При обновлении профиля произошла ошибка.' : 'Успешно'}</span>
              <button
                type="submit"
                className={`login__submit ${(values.username === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'login__submit_disabled' : ''}`}
                disabled={!isValid || isSend || isError}
              >{isSend ? <Preloader name='button' /> : 'Сохранить'}</button>
              <button
                type="button"
                className={`profile__submit `}
                onClick={() => {
                  setIsEdit(false)
                  setSuccess(false)
                  setIsError(false)
                }}
              >{'Отменить редактирование'}</button>
            </>
      }
    </form>
  )
}
