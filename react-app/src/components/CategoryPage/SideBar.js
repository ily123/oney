import styles from './SideBar.module.css';
import { NavLink } from 'react-router-dom';

export default function SideBar({ categories, tree, categoryId }) {
  const currentCategory = categories[categoryId]
  const renderCategories = currentCategory.children;
  
  return (
    <ul className={styles.sideBar}>
      {
        currentCategory.parent_id 
        ? <GoBackToParentCategoryLink parentCategory={categories[currentCategory.parent_id]} />
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

function GoBackToParentCategoryLink({ parentCategory }) {
  return (
    <li key="back">
      <NavLink to={`/category/${parentCategory.id}`}>
        {`< Back (${parentCategory.short_name})`}
      </NavLink>
    </li>
  )
}
