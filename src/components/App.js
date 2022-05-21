import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';
import positiveResponseImg from '../images/OK.svg';
import negativeResponseImg from '../images/notOK.svg';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardForRemove, setCardForRemove] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [cards, setCards] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [noticeOfRegistration, setNoticeOfRegistration] = useState({
    message: '',
    link: '',
  });
  const navigate = useNavigate();
  const [emailForHeader, setEmailForHeader] = useState(null);

  useEffect(() => {
    if (isAuthorized) {
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
    }
  }, [isAuthorized]);

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
    setSelectedCard({ name: '', link: '' });
    setNoticeOfRegistration({
      message: '',
      link: '',
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) => prevState.map((c) => (c._id === card._id ? newCard : c)));
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
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsAuthorized(true);
          navigate('/');
        }
        setEmailForHeader(email);
      })
      .catch((err) =>
        setNoticeOfRegistration({
          message: `Ошибка! ${err.message}`,
          link: negativeResponseImg,
        })
      );
  }

  function signOut(e) {
    if (e.target.textContent === 'Выйти') {
      localStorage.removeItem('jwt');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt).then((res) => {
        if (res) {
          setEmailForHeader(res.data.email);
          setIsAuthorized(true);
          navigate('/');
        }
      });
    }
  }, []);

  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then(() => navigate('/sign-in'))
      .then(() => {
        setNoticeOfRegistration({
          message: 'Вы успешно зарегистрировались!',
          link: positiveResponseImg,
        });
      })
      .catch((err) => {
        setNoticeOfRegistration({
          message: `Ошибка! ${err.message}`,
          link: negativeResponseImg,
        });
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={signOut} userEmail={emailForHeader} />
        <Routes>
          <Route path="/sign-up" element={<Register dataForRegister={handleRegistration} />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/" element={<ProtectedRoute isAuthorized={isAuthorized} />}>
            <Route
              exact
              path="/"
              element={
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onConfirmDeleteCard={handleConfirmPopupClick}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                />
              }
            />
          </Route>
        </Routes>
        {isAuthorized && <Footer />}

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
        <InfoTooltip onClose={closeAllPopups} noticeOfRegistration={noticeOfRegistration} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
