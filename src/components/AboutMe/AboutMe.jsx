import { Link } from "react-router-dom"
import './AboutMe.css'
import photo from '../../images/i1.jpg'
import Wrapper from "../Wrapper/Wrapper"

export default function AboutMe() {
  return (
    <section className="aboutme page__aboutme">
      <Wrapper>
        <h2 className="aboutme__title">Студент</h2>
        <div className="aboutme__container">
          <div className="aboutme__text-container">
            <h3 className="aboutme__name">Филипп</h3>
            <p className="aboutme__job">Фронтенд-разработчик, 31 лет</p>
            <p className="aboutme__description">Я&nbsp;живу в&nbsp;Санкт-Петербурге, закончил великолепный университет БГТУ &laquo;ВОЕНМЕХ&raquo; им. Д.Ф. Устинова,
              сейчас изучаю фронтенд разработку, увлекаюсь путешествиями.
            </p>
            <Link to={'https://github.com/filippp0'} target='_blank' className="aboutme__link">Github</Link>
          </div>
          <img src={photo} alt="#" className="aboutme__image" />
        </div>
      </Wrapper>
    </section>
  )
}
