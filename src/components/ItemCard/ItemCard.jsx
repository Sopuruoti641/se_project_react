import { CurrentUserContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  console.log(item);
  return (
    <div className="clothing__cards">
      <h2 className="clothing-card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="clothing-card__image"
      />
      {isLoggedIn && (
        <button
          onClick={(e) => onCardLike({ id: item._id, isLiked })}
          type="button"
          className={`clothing-card__like-button ${
            isLiked ? "clothing-card__like-button_active" : ""
          }`}
        ></button>
      )}
    </div>
  );
}

export default ItemCard;
