import React from 'react';

function InfoTooltip({ onClose, noticeOfRegistration }) {
  return (
    <div className={`popup ${noticeOfRegistration.message && 'popup_opened'}`}>
      <figure className="popup__info-tooltip">
        <button
          aria-label="close"
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <img
          className="popup__info-tooltip_picture"
          src={noticeOfRegistration.link}
          alt={noticeOfRegistration.message}
        />
        <p className="popup__info-tooltip_message">{noticeOfRegistration.message}</p>
      </figure>
    </div>
  );
}

export default InfoTooltip;
