import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothingSection({ onCardClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__add">
        <p className="clothes__text">Your items</p>
        <button className="clothes__button">+ Add new</button>
      </div>
      <ul className="clothes__section-items">
        {defaultClothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothingSection;
