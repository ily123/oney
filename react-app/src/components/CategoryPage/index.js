import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector }from 'react-redux';
import { fetchProductsForCategory } from '../../store/category';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.category.products)

  useEffect(() => {
    dispatch(fetchProductsForCategory(categoryId))
  }, [dispatch, categoryId])

  if (!products) return null

  return (
    <div>
      <h2>{`Description for category ${categoryId} will go here.`}</h2>
      {Object.values(products).map(product => {
        return <ProductCard id={product.id} price={product.price} images={product.images} />
      })}
    </div>
  )
}
