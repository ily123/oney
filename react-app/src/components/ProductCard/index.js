import './ProductCard.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({id,price,images}) => {


    let image = images[0]?.url_570xN

    if (image) {
        return (
            <div className="prod">
                <NavLink to={`/products/${id}`}>
                    <div className='product_card'>
                        <img className= 'productImage' src={image} alt=""/>
                        <span className='productPrice'>${price}</span>
                    </div>
                </NavLink>
            </div>
            );
        }
    return null
};

export default ProductCard;
