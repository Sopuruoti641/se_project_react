import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ card, onClose, onSubmit }) {
  return (
    <div className={`modal modal_opened`}>
      <div className="modal__content delete-modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="delete-modal__close-btn"
        ></button>
        <div className="delete-modal__footer">
          <h2 className="delete-modal__caption">
            Are you sure you want to delete this item? This action is
            irreversible.
          </h2>
          <div className="delete-modal__buttons">
            <button
              onClick={onSubmit}
              type="submit"
              className="delete-modal__delete-btn"
            >
              Yes, delete Item
            </button>
            <button
              onClick={onClose}
              type="button"
              className="delete-modal__cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmModal;
