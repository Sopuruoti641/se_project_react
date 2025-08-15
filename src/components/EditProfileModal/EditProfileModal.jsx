import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateProfile } from "../../utils/api";
import { useForm } from "../../Hooks/useForm";

export default function EditProfileModal({
  isOpen,
  onClose,
  handleUpdateUser,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    const token = localStorage.getItem("jwt");
    updateProfile(values, token)
      .then((updatedUser) => {
        handleUpdateUser(updatedUser);
        onClose();
      })
      .catch((error) => {
        console.log("Error updating profile:", error);
      });
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          name="name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="profile-avatar"
          name="avatar"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
