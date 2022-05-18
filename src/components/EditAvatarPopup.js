import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isLoading, onClose, isOpen, onUpdateAvatar }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isLoading={isLoading}
      nameButton="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title={"Обновить аватар"}
    >
      <input
        ref={avatarRef}
        className="popup__text popup__text_type_link"
        id="avatar-input"
        name="link"
        type="url"
        placeholder="URL"
        required
      />
      <span className="popup__text-error avatar-input-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
