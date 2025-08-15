import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser?.name}
        />
      );
    } else {
      const firstLetter = currentUser?.name
        ? currentUser.name[0].toUpperCase()
        : "?";
      return (
        <div className="sidebar__avatar sidebar__avatar-placeholder">
          {firstLetter}
        </div>
      );
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        {renderAvatar()}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        onClick={handleEditProfileClick}
        className="sidebar__change_profile_btn"
      >
        Change profile data
      </button>
      <button onClick={handleLogout} className="sidebar__log_out_btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
