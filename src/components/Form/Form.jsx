import { useContext } from 'react'
import './Form.css'
import Preloader from '../Preloader/Preloader'
import ErrorContext from '../../contexts/ErrorContext'
import SendContext from '../../contexts/SendContext'
import { useEffect } from 'react'

export default function Form({ name, children, isValid, onSubmit, setIsError }) {

  const isError = useContext(ErrorContext)
  const isSend = useContext(SendContext)

  useEffect(() => {
    setIsError(false)
  }, [setIsError])

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
            <span className={`profile__error-request ${isError && 'profile__error-request_active'}`}>{'При обновлении профиля произошла ошибка.'}</span>
            <button
              type="submit"
              className='profile__submit'
              disabled={!isValid || isSend}
            >{isSend ? <Preloader name='button-small' /> : 'Редактировать'}</button>
          </>
      }
    </form>
  )
}
