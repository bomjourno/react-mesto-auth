import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isLoading, onClose, isOpen, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      nameButton="Сохранить"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title={"Редактировать профиль"}
      isLoading={isLoading}
    >
      <input
        onChange={handleChangeName}
        value={name}
        className="popup__text popup__text_type_name"
        id="name-input"
        name="name"
        type="text"
        placeholder="Ваше Имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__text-error name-input-error" />
      <input
        onChange={handleChangeDescription}
        value={description}
        className="popup__text popup__text_type_position"
        id="position-input"
        name="position"
        type="text"
        placeholder="Ваша Должность"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__text-error position-input-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
