import "./DeleteModalForm.css";

const DeleteModalForm = ({ isOpen, onClose, onSubmit }) => (
  <div id="delete-form" className={`modal ${isOpen ? "modal_opened" : ""}`}>
    <div id="delete-form" className="modal__content">
      <h2 id="delete-form" className="modal__title">
        <span>Are you sure you want to delete this item?</span>
        <span className="modal__subtitle">This action is irreversible.</span>
      </h2>
      <button onClick={onClose} type="button" className="modal__close"></button>
      <form onSubmit={onSubmit} className="modal__delete">
        <button id="delete-form" type="submit" className="modal__delete-btn">
          Yes, delete item
        </button>
        <button type="button" onClick={onClose} className="modal__cancel">
          Cancel
        </button>
      </form>
    </div>
  </div>
);

export default DeleteModalForm;
