import React, { useState } from "react";

import styles from "../Card/card.module.scss";
import plus from "../../assets/plus.svg";
import chPlus from "../../assets/greenPlus.svg";
import ContentLoader from "react-content-loader";
import liked from "../../assets/liked.svg";
import unliked from "../../assets/unliked.png";

const Card = ({
  id,
  img,
  name,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false, 
}) => {
  const [add, setAdd] = useState(added);
  const [favorite, setFavorite] = useState(favorited);

  const handlePlus = () => {
    onPlus({ id, img, name, price });
    setAdd(!add);
  };

  const handleFavorite = () => {
    onFavorite({ id, img, name, price });
    setFavorite(!favorite);
  };

  return (
    <div className={styles.card}>
      {
        loading ?  <ContentLoader 
        speed={2}
        width={155}
        height={265}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
        <rect x="0" y="167" rx="3" ry="5" width="155" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
      </ContentLoader> :
       <>
         <div className={styles.favorite} onClick={handleFavorite}>
         <img alt="like" src={favorite ? liked : unliked} />
       </div>
  
       <img src={img} alt="sneaker" width={133} height={112} />
       <h5> {name} </h5>
       <div className={styles.cardContent}>
         <div className={styles.cardPrice}>
           <span> Цена: </span>
           <b> {price} руб. </b>
         </div>
  
         <img alt="addToCard" onClick={handlePlus} src={add ? chPlus : plus} />
       </div>
       </>

      }
     
     
    </div>
  );
};

export default Card;
