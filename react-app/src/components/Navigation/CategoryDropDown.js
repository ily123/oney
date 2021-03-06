import styles from './CategoryDropDown.module.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryTree } from '../../store/category';

export default function CategoryDropDown() {
    const dispatch = useDispatch();
    const root = useSelector(state => state.category.tree)

    useEffect(() => {
      dispatch(fetchCategoryTree())
    }, [dispatch])

    if (!root) return null;

    const NUM_CATEG_TO_SHOW = 8; // plus root!
    return (
        <ul className={styles.categoryList}>
            {(root.children.slice(0, NUM_CATEG_TO_SHOW).map(category => {
                return (
                    <li key={category.id}><Menu category={category} /></li>
                )
            }))}
            <li key="root"><Menu category={root} /></li>
        </ul>
    )
}

function Menu({ category }) {
    const [showMenu, setShowMenu] = useState(false)
    const openMenu = () => setShowMenu(true)
    const closeMenu = () => setShowMenu(false)

    return (
        <div
            onMouseOver={openMenu} onMouseLeave={closeMenu}
            className={styles.dropdownWrapper}
        >
            <NavLink className={styles.head} to={`/category/${category.id}`}>{category.short_name}</NavLink>
            {showMenu && (
                <ul className={styles.menu}>
                    {category.children.map(child => {
                        return (
                            <li key={child.id} className={styles.item}>
                                <NavLink to={`/category/${child.id}`}>{child.short_name}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>

    )
}
