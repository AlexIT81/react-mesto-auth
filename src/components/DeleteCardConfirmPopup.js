import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardConfirmPopup({ isOpen, onClose, buttonText, onDeleteCard }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm name={'delete-card-confirm'} title={'Вы уверены?'} isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>

    </PopupWithForm>
  )
}

export default DeleteCardConfirmPopup;