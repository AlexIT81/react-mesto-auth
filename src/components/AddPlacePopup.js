import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  const [place, setPlace] = React.useState({ title: '', link: '' });

  React.useEffect(() => {
    setPlace({ title: '', link: '' })
  }, [isOpen]);

  function handlePlaceChange(e) {
    setPlace({ ...place, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place.title,
      link: place.link
    });
  }

  return (
    <PopupWithForm name={'add'} title={'Новое место'} isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_title" type="text" name="title" minLength="2" maxLength="30" value={place.title} onChange={handlePlaceChange} required placeholder="Название" />
      <span className="popup__error title-input-error"></span>
      <input className="popup__input popup__input_link" type="url" name="link" value={place.link} onChange={handlePlaceChange} required placeholder="Ссылка на картинку" />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;