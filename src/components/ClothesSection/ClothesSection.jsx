import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onCardClick, onAddItemClick, clothingItems }) => (
  <div className="clothes__section">
    <div className="clothes__add">
      <p className="clothes__text">Your items</p>
      <button
        onClick={onAddItemClick}
        type="button"
        className="clothes__button"
      >
        + Add item
      </button>
    </div>
    <ul className="clothes__section-items">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
      ))}
    </ul>
  </div>
);

export default ClothesSection;
