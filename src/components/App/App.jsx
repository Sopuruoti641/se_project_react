import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
} from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  getItems,
  postItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import DeleteConfirmModal from "../DeleteModalForm/DeleteConfirmModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getCurrentUser,
  signUp,
  login,
  getToken,
  updateUser,
} from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temp: { F: 999, C: 999 },
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [likedCard, setLikedCard] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    avatar: "",
    _id: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [deleteCard, setDeleteCard] = useState("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLike = () => {
    setLikedCard("liked");
  };

  const handleLogin = () => {
    setActiveModal("Login");
  };

  const handleRegister = () => {
    setActiveModal("Register");
  };

  const handleEditModal = () => {
    setActiveModal("Edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = () => {
    setActiveModal("delete-card");
  };

  useEffect(() => {
    if (isLoggedIn) {
      getItems()
        .then((data) => {
          setClothingItems(data.reverse());
        })
        .catch(console.error);
    } else {
      // Optionally clear items when logged out
      setClothingItems([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
        // console.log(filterData)
      })

      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const addItem = ({ name, weather, imageUrl }) => {
    postItem({ name, weather, imageUrl })
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    return updateUser({ name, avatar })
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const deleteItem = (_id) => {
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatar }) => {
    return signUp({ email, password, name, avatar })
      .then((data) => {
        handleLoginModalSubmit(email, password);
      })
      .catch((error) => {
        console.error("Cannot Register", error);
      });
  };

  const handleLoginModalSubmit = (email, password) => {
    return login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      avatar: "",
      _id: "",
    });
    localStorage.removeItem("jwt");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getCurrentUser()
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                    likedCard={likedCard}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onEdit={handleEditModal}
                      clothingItems={clothingItems}
                      onSubmit={addItem}
                      onLogout={handleLogoutClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal addItem={addItem} onClose={closeActiveModal} />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              handleDeleteCard={handleDeleteCard}
            />
          )}
          {activeModal === "delete-card" && (
            <DeleteConfirmModal
              onClose={closeActiveModal}
              onClick={handleDeleteCard}
              onSubmit={deleteItem}
            />
          )}
          {activeModal === "Login" && (
            <LoginModal
              onLogin={handleLoginModalSubmit}
              handleRegister={handleRegister}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "Register" && (
            <RegisterModal
              onRegister={handleRegisterModalSubmit}
              handleLogin={handleLogin}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "Edit" && (
            <EditProfileModal
              onClose={closeActiveModal}
              onEdit={handleEditProfile}
            />
          )}
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
