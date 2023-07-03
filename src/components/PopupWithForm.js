function PopupWithForm({ children, isOpen, name, onClose, title, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" action="./" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__button" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close main-link" onClick={onClose} type="button"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;