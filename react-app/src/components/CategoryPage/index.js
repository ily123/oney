import styles from './CategoryPage.module.css';
import { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ProductCardXL from './ProductCardXL';
import SideBar from './SideBar';
import Pager from './Pager';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsForCategory } from '../../store/category';

export default function CategoryPage() {
  let { categoryId, pageNumber } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.category.products)
  const categories = useSelector(state => state.category.flat)
  const tree = useSelector(state => state.category.tree)
  
  useEffect(() => {
    dispatch(fetchProductsForCategory(
      categoryId === "root" ? 0 : categoryId, // the backend only accepts ints, fix later
      pageNumber
    ))
  }, [dispatch, categoryId, pageNumber])

  if (!products || !categories || !Object.keys(products).length) {
    return categoryNotFoundError({ categoryId })
  }

  const category = categories[categoryId];

  return (
    <div className={styles.categoryPageWrapper}>
      <h2>{category.page_tile}</h2>
      <p>{category.page_description}</p>
      <div className={styles.sideBarCardAreaWrapper}>
        <SideBar categories={categories} tree={tree} categoryId={categoryId} />
        <div className={styles.cardArea}>
          {Object.values(products).map(product => {
            return <ProductCardXL key={product.id} product={product}/>
          })}
        </div>
      </div>
      <Pager pageNumber={pageNumber} category={category} />
    </div>
  )
}

function categoryNotFoundError ({ categoryId }) {
  return (
    <div className={styles.error_msg}>
      <i className="fas fa-exclamation-triangle"></i>
      <p>{`Category ${categoryId} does not exist, or has no items :(`}</p>
      <i className="fas fa-exclamation-triangle"></i>
    </div>
  )
}
export function CategoryPageRedirectToPageOne() {
  const { categoryId } = useParams();
  return <Redirect to={`/category/${categoryId}/page/1`} />
}
