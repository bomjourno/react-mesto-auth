import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_fullscreen-card ${card.name && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button
          aria-label="close"
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
