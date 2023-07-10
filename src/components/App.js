import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeleteCardConfirmPopup from "./DeleteCardConfirmPopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import * as auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
  });
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    link: "",
    name: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [deleteCardConfirm, setDeleteCardConfirm] = useState({
    isOpen: false,
    card: {},
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards, userData] = res;
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setButtonText("Сохранить");
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setButtonText("Добавить");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setButtonText("Обновить");
  }

  function handleInfoTooltip(isSuccess = false) {
    setIsInfoTooltip({ isOpen: true, isSuccess: isSuccess });
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, link: "", name: "" });
    setDeleteCardConfirm({ isOpen: false, card: "" });
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser({ name, about }) {
    setButtonText("Сохранение..");
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText("Сохранить"));
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonText("Обновление...");
    api
      .setAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText("Обновить"));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setButtonText("Добавление...");
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText("Добавить"));
  }

  function handleCardDelete() {
    setButtonText("Удаление...");
    api
      .deleteCard(deleteCardConfirm.card._id)
      .then(() => {
        setCards(
          cards.filter((item) => item._id !== deleteCardConfirm.card._id)
        );
        closeAllPopups();
        setDeleteCardConfirm({ isOpen: false, card: {} });
      })
      .catch((err) => console.error(err))
      .finally(() => setButtonText("Да!"));
  }

  function handleCardDeleteConfirmClick(card) {
    setDeleteCardConfirm({ isOpen: true, card: card });
    setButtonText("Да!");
  }

  /** авторизация  */
  const authorization = (token) => {
    return auth.getContent(token).then((res) => {
      if (res.data) {
        setLoggedIn(true);
        setUserEmail(res.data.email);
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authorization(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn]);

  /** регистрация пользователя */
  const onRegister = ({ password, email }) => {
    return auth.register(password, email).then((res) => {
      if (!res || res.error) {
        handleInfoTooltip();
      } else {
        handleInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      }
      return res;
    });
  };

  /** Логинемся */
  const onLogin = ({ password, email }) => {
    return auth.login(password, email).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        authorization(res.token);
      } else {
        console.error(res.message);
      }
      return res;
    });
  };

  /** Выход пользователя */
  const onSignOut = () => {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  return (
    <div className='page'>
      <div className='root page__root'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header userEmail={userEmail} onSignOut={onSignOut} />
          <main className='root__main'>
            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteConfirmClick}
                  />
                }
              />
              <Route
                path='/sign-up'
                element={<Register onRegister={onRegister} />}
              />
              <Route path='/sign-in' element={<Login onLogin={onLogin} />} />
              <Route
                path='*'
                element={
                  loggedIn ? (
                    <Navigate to='/' replace />
                  ) : (
                    <Navigate to='/sign-in' replace />
                  )
                }
              />
            </Routes>
          </main>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText={buttonText}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={buttonText}
          />
          <DeleteCardConfirmPopup
            isOpen={deleteCardConfirm.isOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            buttonText={buttonText}
          />
          <InfoTooltip
            isOpen={isInfoTooltip.isOpen}
            onClose={closeAllPopups}
            isSuccess={isInfoTooltip.isSuccess}
          />
          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
