import React, { useState, useEffect, useContext, createContext } from "react";
import styles from "./index.module.scss";
import axios from "axios";

//components
import Header from "./pageComponents/Header/Header";
import Drawer from "./components/Drawer/Drawer";

import Home from "./pages/Home/Home";
import { Route } from "react-router-dom";
import Favorite from "./pages/Favorites/Favorite";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/items"
      );
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCard = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/" + obj.id
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites/" + obj.id
        );
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          "https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete("https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/" + id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

    const isItemAdded = (id) => {
      return cartItems.some(obj => Number(obj.id) === Number(id))
    } 
  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
        <div className={styles.wrapper}>
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToCard={onAddToCard}
          onAddToFavorite={onAddToFavorite}
          isLoading={isLoading}
        />
      </Route>

      <Route path="/favorite" exact>
        <Favorite />
      </Route>
    </div>


    </AppContext.Provider>
  );
}

export default App;
