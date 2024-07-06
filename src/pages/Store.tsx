import storeItems from "../data/items.json";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {storeItems.map((e) => {
        return (
          <StoreItem
            key={e.id}
            id={e.id}
            imgUrl={e.imgUrl}
            name={e.name}
            price={e.price}
          />
        );
      })}
    </div>
  );
};
export default Store;
