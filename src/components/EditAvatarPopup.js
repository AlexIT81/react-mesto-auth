import React, { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();
  const [avatarError, setAvatarError] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    avatarRef.current.value = "";
    setAvatarError("");
  }, [isOpen]);

  useEffect(() => {
    isLoading ? setButtonText("Обновление...") : setButtonText("Обновить");
  }, [isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleAvatarChange(e) {
    if (!e.target.validity.valid) {
      setAvatarError(e.target.validationMessage);
    } else {
      setAvatarError("");
    }
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        onChange={handleAvatarChange}
        className={`popup__input popup__input_name ${
          avatarError && "popup__input_type_error"
        }`}
        type='url'
        name='link'
        required
        placeholder='Ссылка на аватар'
      />
      <span
        className={`popup__error link-input-error ${
          avatarError && "popup__error_visible"
        }`}
      >
        {avatarError}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
