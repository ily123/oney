import './ProductCard.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({id,price,images}) => {

    console.log(id)
    let image = images[0]?.url_570xN

    if (image) {
        return (
                <NavLink to={`/products/${id}`}>
                    <div className='product_card'>
                        <img className= 'productImage' src={image} alt=""/>
                        <span className='productPrice'>${price}</span>
                    </div>
                </NavLink>
            );
        }
    return null
};

export default ProductCard;
