import { Link } from 'react-router-dom'
import Form from '../Form/Form'
import './Profile.css'
import Input from '../Input/Input'
import useFormValidation from '../../hooks/useFormValidation'
import { useEffect } from 'react'
import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { EmailRegex } from "../../utils/constants";

export default function Profile({ name, logOut, editUserData, setIsError, isSuccess, setSuccess, setIsEdit, isEdit}) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    reset({ username: currentUser.name, email: currentUser.email })
  }, [reset, currentUser, isEdit])

  function onSubmit(evt) {
    evt.preventDefault()
    editUserData(values.username, values.email)
  }

  return (
    <section className="profile page__profile">
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={onSubmit}
        setIsError={setIsError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      >
        <Input
          selectname={name}
          name='username'
          type='text'
          title='Имя'
          minLength='3'
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
          isEdit={isEdit}
        />
        <Input
          selectname={name}
          name='email'
          type='email'
          title='E-mail'
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
          pattern={EmailRegex}
          isEdit={isEdit}
        />
      </Form>
      <Link to='/' onClick={logOut} className='profile__link'>Выйти из аккаунта</Link>
    </section>
  )
}
