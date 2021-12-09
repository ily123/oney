import styles from './SideBar.module.css';

export default function SideBar({ categories, categoryId }) {
  console.log("i am here", categories)
  console.log("i am here", categoryId)
  return (
    <div className={styles.sideBar}>Sidebar</div>
  )
     //   <ul className={styles.menu}>
     //   {category.children.map(child => {
     //     return (
     //       <li key={child.id} className={styles.item}>
     //         <NavLink to={`/category/${child.id}`}>{child.short_name}</NavLink>
     //       </li>
     //     )
     //   })}
     //   </ul>
}
