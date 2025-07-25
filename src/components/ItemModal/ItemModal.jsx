import "../ItemModal/ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";

function ItemModal({ onClose, handleDeleteCard, selectedCard }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = selectedCard.owner?._id === currentUser._id;

  // const itemDeleteButtonClassName = `modal__delete-button ${
  //   isOwn ? "" : "modal__delete-button_hidden"
  // }`;

  return (
    <div className={`modal modal_opened`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn"
        ></button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{selectedCard.name}</h2>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => handleDeleteCard(selectedCard)}
          >
            Delete Item
          </button>
          <p className="modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
