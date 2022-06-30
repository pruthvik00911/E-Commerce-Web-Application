import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../redux/actions/cartActions"


const CardCard = (props) => {

    const { id, title, amount, discount, count } = props.product

    const dispatch = useDispatch()

    return (
        <div id='cart_card'>
            <div className="cart_image_container">
                <div className="cart_image"></div>
            </div>

            <div className="cart_info_box">

                <div className="cart_top">
                    <div className="cart_row">
                        <div className="cart_title">{title}</div>
                        <div className="cart_price">₹ {((amount) * (1 - (discount / 100)) * count)}</div>
                    </div>
                    <div className="cart_row">
                        <div className="cart_item_name small_alert">Cart item name</div>
                        <div className="cart_discount">
                            <div className="eliminated_price">MRP ₹<span>{amount * count}</span></div>
                            <div className="percent_off">{discount}% OFF</div>
                        </div>
                    </div>
                </div>
                <div className="cart_row">
                    <div className="cart_row">
                        <div className="counter">
                            <button onClick={() => {
                                dispatch(addToCart({ id: id }))
                            }} className="counter_button">+</button>
                            <div className="counter_num">{count}</div>
                            <button onClick={() => {
                                dispatch(removeFromCart({ id: id, fullRemove: false }))
                            }} className="counter_button">-</button>
                        </div>
                        <div>
                            <button onClick={() => {
                                dispatch(removeFromCart({ id: id, fullRemove: true }))
                            }} className="nav_button">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCard