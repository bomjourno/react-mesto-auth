import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import btnAddCard from "../images/vector.svg";
import Card from "./Card";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__cover">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
            title="Изменить аватар профиля"
          />
          <div onClick={props.onEditAvatar} className="profile__hover"></div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              className="profile__edit-button"
            ></button>
            <p className="profile__position">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
        >
          <img className="profile__vector" src={btnAddCard} alt="Кнопка" />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onConfirmDeleteCard={props.onConfirmDeleteCard}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
