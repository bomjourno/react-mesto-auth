import React from "react";
import Loader from "./Loader";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__close-button"
          type="button"
        ></button>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          name={`${props.name}`}
        >
          <fieldset className="popup__form-set">
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            {props.isLoading ? (<button className="popup__submit" type="submit">
              {<Loader/>}
            </button>): (<button className="popup__submit" type="submit">
              {props.nameButton}
            </button>)}
            
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
