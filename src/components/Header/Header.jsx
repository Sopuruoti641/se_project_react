import "./Header.css";
import headlogo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";

function Header({
  handleAddClick,
  handleRegister,
  handleLogin,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={headlogo} alt="Logo Image" className="header__logo" />
        </Link>
        <p className="header__date-and-lo">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__toggle-wrapper">
        <ToggleSwitch />
      </div>
      {!isLoggedIn && (
        <>
          <button
            onClick={handleRegister}
            type="button"
            className="header__sign-in"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            type="button"
            className="header__log-in"
          >
            Log In
          </button>
        </>
      )}
      {isLoggedIn && (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__user-name">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt="User name"
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
