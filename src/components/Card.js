import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__remove ${
    isOwn ? "element__remove_visible" : "element__remove_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick({ name: props.card.name, link: props.card.link });
  }

  function handleLikeCard() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onConfirmDeleteCard(props.card);
  }

  return (
    <li className="element">
      <img
        onClick={handleClick}
        className="element__picture"
        src={props.card.link}
        alt={props.card.name}
      />
      <button
        onClick={handleDeleteCard}
        className={cardDeleteButtonClassName}
        type="button"
        title="Удалить"
      ></button>
      <div className="element__cover">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeCard}
            type="button"
          ></button>
          <span className="element__num-like">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
