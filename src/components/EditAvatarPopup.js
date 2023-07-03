import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  const avatarRef = React.useRef();
  const [avatarError, setAvatarError] = React.useState('');

  React.useEffect(() => {
    avatarRef.current.value = '';
    setAvatarError('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleAvatarChange(e) {
    const regex = /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg|bmp))/i;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setAvatarError(e.target.validationMessage)
    } else {
      setAvatarError('');
    }
  }

  return (
    <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
      <input ref={avatarRef} onChange={handleAvatarChange} className={`popup__input popup__input_name ${avatarError && 'popup__input_type_error'}`}  type="url" name="link" required placeholder="Ссылка на аватар" />
      <span className={`popup__error link-input-error ${avatarError && 'popup__error_visible'}`}>{avatarError}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;