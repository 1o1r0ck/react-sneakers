import React, { useState } from 'react'

import styles from '../Card/card.module.scss'
import plus from '../../assets/plus.svg'
import chPlus from '../../assets/greenPlus.svg'

import liked from '../../assets/liked.svg'
import unliked from '../../assets/unliked.png'

const Card = ({id, img, name, price, onFavorite, onPlus, favorited = false}) => {


    const [add, setAdd] = useState(false)
    const [favorite, setFavorite] = useState(favorited)

    const handlePlus = () => {
        onPlus({img, name, price});
        setAdd(!add);
    }

    

    const handleFavorite = () => {
        onFavorite({id, img, name, price});
        setFavorite(!favorite);
    }




    return(
        <div className={styles.card}>
            <div className={styles.favorite} onClick={handleFavorite}> 
                <img  alt='like' 
                    src={favorite ? liked : unliked}/>
            </div>

            <img src={img} alt="sneaker" width={133} height={112}/>
            <h5> {name} </h5>
            <div className={styles.cardContent}>
                <div className={styles.cardPrice}>
                    <span> Цена: </span>
                    <b> {price} руб. </b>
                </div>

                    <img alt="addToCard" onClick={handlePlus}
                        src={add ? chPlus : plus}
                    />     

                    
            </div>
        </div>
    )
}

export default Card