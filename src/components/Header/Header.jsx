import { useState } from "react";
import "./Header.css";
import logo from "../../assets/wtwr.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prevState) => !prevState);
  };

  const handleAddClothesClick = () => {
    handleAddClick();
    setIsMobileMenuOpened(false);
  };

  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className={
          isMobileMenuOpened ? "header__nav-mobile-opened" : "header__nav"
        }
      >
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClothesClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__profile_link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__signup"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="header__login"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        className={isMobileMenuOpened ? "header__close" : "header__mobile_view"}
        onClick={toggleMobileMenu}
      ></button>
    </header>
  );
}

export default Header;
