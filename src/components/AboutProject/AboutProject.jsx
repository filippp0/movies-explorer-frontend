import Wrapper from '../Wrapper/Wrapper'
import './AboutProject.css'


export default function AboutProject() {
  return (
    <section id={"aboutProject"} className="about page__about">
      <Wrapper>
        <h2 className="about__title">О проекте</h2>
        <div className="about__container">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__time-learn">
            <p className="about__progress about__progress_type_backend" >1 неделя</p>
            <p className="about__progress">4 недели</p>
            <span className="about__text">Back-end</span>
            <span className="about__text">Front-end</span>
        </div>
      </Wrapper>
    </section>
  )
}
