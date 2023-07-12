import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardConfirmPopup({ isOpen, onClose, isLoading, onDeleteCard }) {
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    isLoading ? setButtonText("Удаление...") : setButtonText("Да!");
  }, [isLoading]);

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name={"delete-card-confirm"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardConfirmPopup;
