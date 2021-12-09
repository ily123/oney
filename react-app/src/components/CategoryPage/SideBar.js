import styles from './SideBar.module.css';
import { NavLink } from 'react-router-dom';

export default function SideBar({ categories, tree, categoryId }) {
  const currentCategory = categories[categoryId]
  
  // if this is a top-level category render all other top-level categories
  // if lower-level, render siblings and go back button
  let renderCategories;
  if (currentCategory.parent_id) {
    renderCategories = categories[currentCategory.parent_id].children;
  } else {
    renderCategories = tree.children;
  }
  console.log(renderCategories)
  return (
    <ul className={styles.sideBar}>
      {
        currentCategory.parent_id 
        ? <li key="lol"><NavLink to={`/category/69150455`}>{`< Back`}</NavLink></li>
        : null
      }
      {renderCategories.map(category => {
        const isActive = categoryId == category.id ? styles.active : null
        return <li key={"sidebar-link-"+category.id}>
          <NavLink className={isActive} to={`/category/${category.id}`}>{category.short_name}</NavLink>
        </li>
      })}
    </ul>
  )
}
