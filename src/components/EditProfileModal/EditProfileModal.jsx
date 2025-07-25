import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";

function EditProfileModal({ onClose, onEdit }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleChangeImageUrl = (e) => {
    setAvatar(e.target.value);
  };

  const onSubmit = () => {
    return onEdit({
      name: name,
      avatar: avatar,
    });
  };
  return (
    <ModalWithForm
      buttonText="Edit"
      title="Edit"
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleName}
          value={name}
        />
      </label>
      <label className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleChangeImageUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
