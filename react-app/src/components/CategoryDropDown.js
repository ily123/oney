import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryTree } from '../store/category';

export function CategoryDropDown() { 
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch(); 
  const categories = useSelector(state => state.category.tree)


  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchCategoryTree())
    }
    loadData();
    setLoaded(true);   
  }, [dispatch])

  if (!loaded) return null;
  console.log(categories)

  return (
    <div>TEST CATEGORY BAR</div>
  )
}
