import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isLoading, isOpen, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      nameButton="Да"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      isLoading={isLoading}
    />
  );
}

export default ConfirmPopup;
