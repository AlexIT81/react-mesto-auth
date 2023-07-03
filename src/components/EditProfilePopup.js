import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError('');
    setDescriptionError('');
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 40) {
      setNameError(e.target.validationMessage);
    } else {
      setNameError('');
    }
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 200) {
      setDescriptionError(e.target.validationMessage);
    } else {
      setDescriptionError('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name={'edit'} title={'Редактировать профиль'} isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
      <input className={`popup__input popup__input_name ${nameError && 'popup__input_type_error'}`} type="text" name="name" minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} required placeholder="Имя" />
      <span className={`popup__error name-input-error ${nameError && 'popup__error_visible'}`}>{nameError}</span>
      <input className={`popup__input popup__input_job ${descriptionError && 'popup__input_type_error'}`} type="text" name="job" minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} required placeholder="Профессия" />
      <span className={`popup__error job-input-error ${descriptionError && 'popup__error_visible'}`}>{descriptionError}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;