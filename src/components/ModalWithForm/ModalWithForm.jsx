import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  onSubmit,
}) => (
  <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
    <div className="modal__content">
      <div className="modal__title">{title}</div>
      <button onClick={onClose} type="button" className="modal__close"></button>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit">
          {buttonText}
        </button>
      </form>
    </div>
  </div>
);

export default ModalWithForm;
