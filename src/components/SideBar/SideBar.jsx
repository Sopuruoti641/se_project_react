import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";

function SideBar({ onEdit, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__userinfo">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="User avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button type="button" className="sidebar__edit-btn" onClick={onEdit}>
        Edit Profile
      </button>
      <button type="button" className="sidebar__logout-btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
