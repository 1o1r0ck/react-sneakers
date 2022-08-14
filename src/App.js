import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'

//assets

import search from './assets/search.svg'


//components
import Card from './components/Card/card'
import Header from './pageComponents/Header/Header'
import Drawer from './components/Drawer/Drawer'





function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false);
  

  useEffect(() => {
  fetch('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/items')
    .then((res) => {
      return res.json();
    })
    .then((json) =>{
      setItems(json);
    });
  },[]);

  const onAddToCard = (obj) =>{
    setCartItems(prev => [...prev, obj])
  } 

  return (
    <div className={styles.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose = {() => setCartOpened(false)} />}
      
      <Header onClickCart={() => setCartOpened(true)}/>


      <div className={styles.content}>

        <div className={styles.title}>
          <h1> Все кроссовки </h1>

          <div className={styles.searchBar}>
            <img src={search} alt='search'/>
            <input placeholder='Поиск...'/>

          </div>
        </div>

        <div className={styles.sneakers}>
          {items.map((item) => (
            <Card 
              img = {item.img}
              name = {item.name}
              price = {item.price} 
              onPlus={(obj) => onAddToCard(item)}
              onFavorite = {() => alert("Нажали на сердце")}
            />
          ))}
          
        </div>

      </div>
    </div>
  );
}

export default App;
