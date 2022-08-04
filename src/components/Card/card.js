import styles from '../Card/card.module.scss'
import plus from '../../assets/plus.svg'

const Card = (props) => {

    return(
        <div className={styles.card}>
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