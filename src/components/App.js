import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardForRemove, setCardForRemove] = useState("");
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [userData, cardsData] = data;
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          _id: userData._id,
        });
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleConfirmPopupClick(card) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCardForRemove(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) =>
          prevState.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api
      .setUserData(info)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newAvatarLink) {
    setIsLoading(true);
    api
      .changeAvatar(newAvatarLink)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .addNewCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleConfirmDeleteSubmit() {
    setIsLoading(true);
    api
      .deleteCard(cardForRemove._id)
      .then(() => {
        setCards(cards.filter((c) => c !== cardForRemove));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    closeAllPopups();
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onConfirmDeleteCard={handleConfirmPopupClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <EditProfilePopup
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />
        <AddPlacePopup
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />
        <ConfirmPopup
          isLoading={isLoading}
          onConfirm={handleConfirmDeleteSubmit}
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
