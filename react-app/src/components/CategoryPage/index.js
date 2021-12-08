import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector }from 'react-redux';
import { fetechCategoryTree } from '../../store/category';

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  return (
    <div>
      <h2>{`Category ${categoryId} items will go here.`}</h2>
    </div>
  )
}
