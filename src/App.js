import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import axios from 'axios'

//assets

import search from './assets/search.svg'
import close from './assets/delete.svg'


//components
import Card from './components/Card/card'
import Header from './pageComponents/Header/Header'
import Drawer from './components/Drawer/Drawer'





function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  

  useEffect(() => {
    axios.get('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    });
  },[]);

  const onAddToCard = (obj) =>{
    axios.post('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  } 

  const onRemoveItem = (id) => {
    axios.delete('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/' + id) 
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const clean = () => {
    setSearchValue('')
  }

  return (
    <div className={styles.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem} />}
      
      <Header onClickCart={() => setCartOpened(true)}/>


      <div className={styles.content}>

        <div className={styles.title}>
          <h1> {searchValue ? 'Поиск по запросу:' + searchValue : 'Все кроссовки' } </h1>

          <div className={styles.searchBar}>
            <img src={search} alt='search'/>
            {searchValue && <img onClick={clean} className={styles.close} src={close} alt='delete'/>}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'/>
            

          </div>
        </div>

        <div className={styles.sneakers}>
          {items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <Card 
              key={index}
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
