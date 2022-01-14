import styles from './ProductCardXL.module.css';
import { Link } from 'react-router-dom';

export default function ProductCardXL({ product }) {
  const imageUrl = product.images[0].url_570xN;
  return (
    <Link className={styles.link} to={`/products/${product.id}`}>
      <figure className={styles.card}>
        <img
          src={imageUrl}
          alt={product.title}
        />
        <figcaption>
          <div className={styles.productTitle}>
            {product.title}
          </div>
          <div className={styles.productInfo}> 
            <span>{`$${product.price.toFixed(2)}`}</span>
          </div>
        </figcaption>
      </figure>
    </Link>
  )
}
