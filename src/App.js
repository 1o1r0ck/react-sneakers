import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import axios from 'axios'


//components
import Header from './pageComponents/Header/Header'
import Drawer from './components/Drawer/Drawer'

import Home from './pages/Home/Home'
import {Routes,  Route } from 'react-router-dom'
import Favorite from './pages/Favorites/Favorite'





function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  

  useEffect(() => {
    axios.get('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/items').then(res => {
      setItems(res.data)
    });
    axios.get('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    });
    axios.get('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    });
  },[]);

  const onAddToCard = (obj) =>{
    axios.post('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  } 

  const onAddToFavorite = async (obj) =>{
    try{
      if(favorites.find((favObj) => favObj.id === obj.id)){
        axios.delete('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites/' + obj.id) 
      } else {
        const {data} = await axios.post('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/favorites', obj)
      
      setFavorites((prev) => [...prev, data])
      }
    }catch (error) {
      alert('Не удаловб добавить в избранное')
    }
    
  }

  const onRemoveItem = (id) => {
    axios.delete('https://62f172ac25d9e8a2e7cc9e15.mockapi.io/cart/' + id) 
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }



  return (
    <div className={styles.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem} />}
      
      
        <Header onClickCart={() => setCartOpened(true)}/>
      
      
        <Route path='/' exact>  
            <Home 
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCard={onAddToCard}
            onAddToFavorite={onAddToFavorite}/>
        </Route>

        <Route path='/favorite' exact>  
            <Favorite items={favorites} onAddToFavorite={onAddToFavorite}/>
        </Route>
        

    </div>
  );
}

export default App;
