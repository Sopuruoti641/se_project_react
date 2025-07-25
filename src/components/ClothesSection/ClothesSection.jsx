import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes__section">
      <div className="clothes-section__header">
        <p>Your Items</p>

        <button
          className="clothes-section__button"
          onClick={handleAddClick}
          type="button"
        >
          + Add New{" "}
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
