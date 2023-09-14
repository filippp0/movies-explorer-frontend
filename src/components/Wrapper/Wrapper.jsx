import './Wrapper.css'

export default function Wrapper({ children }) {

  return (
    <div className="page__wrapper">
      {children}
    </div>
  )
}
