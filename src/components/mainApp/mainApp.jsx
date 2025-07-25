import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";

import { getItems, postItem, removeItem } from "../../utils/Api";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
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

  const handleDeleteCard = () => {
    setActiveModal("delete-card");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
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

  const deleteItem = (_id) => {
    removeItem(selectedCard._id)
      .then((data) => {
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
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
              path="/login"
              element={
                <Profile
                  handleAddClick={handleAddClick}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onSubmit={addItem}
                />
              }
            />
          </Routes>
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal addItem={addItem} onClose={closeActiveModal} />
        )}
        {activeModal === "preview" && (
          <ItemModal
            card={selectedCard}
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
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
