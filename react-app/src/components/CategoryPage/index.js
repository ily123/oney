import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector }from 'react-redux';
import { fetchProductsForCategory } from '../../store/category';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  //const useSelector = 

  useEffect(() => {
    dispatch(fetchProductsForCategory(categoryId))
  }, [dispatch, categoryId])

  return (
    <div>
      <h2>{`Category ${categoryId} items will go here.`}</h2>
    </div>
  )
}
