import styles from './Drawer.module.scss'

import del from '../../assets/delete.svg'


const Drawer = ({onClose, items = []}) => {

    return(
        <div className={styles.overlay}>
          <div className={styles.drawer}>
            <h2> Корзина 
              <img src={del} alt='close' onClick={onClose}/>
            </h2>
            

              <div className={styles.cart} > 

              {items.map((obj) => (
                  <div className={styles.cartItem}>
                      <img src={obj.img} alt='sneaker' width={70} height={70}/>
                    <div className={styles.itemPrice}>
                      <p> {obj.name} </p>
                      <b> {obj.price} руб.</b>
                    </div>
                  <img className={styles.remove} src={del} alt='delete'/>
                </div>
              ))}


              </div>

              
            
              <ul className={styles.cartTotalBlock}>
                <li>
                  <span> Итого: </span>
                  <div></div>
                  <b> 21 498 руб.  </b>
                </li>
                <li>
                  <span> Налог 5%:  </span>
                  <div></div>
                  <b> 1074 руб.  </b>
                </li>
              </ul>
              <button> Оформить заказ </button>


          </div>
      </div>
    )
}

export default Drawer