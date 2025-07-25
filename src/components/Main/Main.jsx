import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { getWeatherType } from "../../utils/weatherApi";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Main = ({
  weatherData,
  handleCardClick,
  clothingItems,
  isLoggedIn,
  onCardLike,
  likedCard,
}) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} getWeatherType={getWeatherType} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  isLoggedIn={isLoggedIn}
                  onCardLike={onCardLike}
                  likedCard={likedCard}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
};

export default Main;
