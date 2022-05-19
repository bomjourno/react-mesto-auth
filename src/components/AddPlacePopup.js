import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isLoading, onClose, isOpen, onAddPlace }) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      nameButton="Создать"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="add-place"
      title="Новое место"
      isLoading={isLoading}
    >
      <input
        value={name}
        onChange={handleChangeName}
        className="popup__text popup__text_type_place"
        id="place-input"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__text-error place-input-error" />
      <input
        value={link}
        onChange={handleChangeLink}
        className="popup__text popup__text_type_link"
        id="link-input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__text-error link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
