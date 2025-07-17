import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { getItems, addItems, deleteItems } from "../../utils/Api";
import DeleteModalForm from "../DeleteModalForm/DeleteModalForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { register, login, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const closeAuthModal = () => setActiveAuthModal("");

  const openLoginModal = () => setActiveAuthModal("login");
  const openRegisterModal = () => setActiveAuthModal("register");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }) => {
    addItems({ name, weather, imageUrl })
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleOpenDeleteModal = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();

    deleteItems(itemToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== itemToDelete._id)
        );
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const sorted = [...data].sort((a, b) => b._id - a._id); // newest first
        setClothingItems(sorted);
      })
      .catch(console.error);
  }, []);
  // useEffect(() => {
  //   getItems()
  //     .then((data) => {
  //       setClothingItems(data);
  //     })

  //     .catch(console.error);
  // }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleOpenDeleteModal}
        />
        <DeleteModalForm
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onSubmit={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
