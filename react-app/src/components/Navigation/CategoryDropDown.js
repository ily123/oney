import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryTree } from '../../store/category';

export default function CategoryDropDown() { 
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch(); 
  const root = useSelector(state => state.category.tree)


  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchCategoryTree())
    }
    loadData();
    setLoaded(true);   
  }, [dispatch])

  if (!loaded || !root) return null;
  
  const NUM_CATEG_TO_SHOW = 9;
  return (
    <ul className="CategorisList">
      {(root.children.slice(0, NUM_CATEG_TO_SHOW).map(category => {
        return (
          <li key={category.id}>
            <NavLink to={`/category/${category.id}`}>{category.short_name}</NavLink>
          </li> 
        )
      }))}
    </ul>
  )
}
