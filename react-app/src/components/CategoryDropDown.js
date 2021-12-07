import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export function CategoryDropDown() { 
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch(); 

  useEffect(() => {
    const loadData = async () => {
    }
    loadData();
    setLoaded(true);   
  }, [dispatch])

  if (!loaded) return null;

  return (
    <div>TEST CATEGORY BAR</div>
  )
}
