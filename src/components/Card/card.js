import styles from '../Card/card.module.scss'
import plus from '../../assets/plus.svg'

import liked from '../../assets/liked.svg'
import unliked from '../../assets/unliked.svg'

const Card = (props) => {

    return(
        <div className={styles.card}>
            <div className={styles.favorite}> 
                <img src={liked} alt='liked'/>
            </div>

            <img src={props.img} alt="sneaker" width={133} height={112}/>
            <h5> {props.name} </h5>
            <div className={styles.cardContent}>
                <div className={styles.cardPrice}>
                    <span> Цена: </span>
                    <b> {props.price} руб. </b>
                </div>
                <button> 
                    <img src={plus} alt="addToCard" width={11} height={11}/>     
                </button>
            </div>
        </div>
    )
}

export default Card