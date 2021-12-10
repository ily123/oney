import styles from './Pager.module.css';
import { NavLink } from 'react-router-dom';

export default function Pager({ pageNumber, category }) {
  // count number of products in category, including sub-categories
  const countProducts = (category) => {
    const queue = [category]
    let productCount = 0
    while (queue.length) {
      const node = queue.pop()
      productCount += node.product_count ? node.product_count : 0
      if (node.children) {
        queue.push(...node.children)
      }
    }
    return productCount;
  }

  const productCount = countProducts(category)
  const PRODUCTS_PER_PAGE = 12;
  const totalPages = Math.ceil(productCount / PRODUCTS_PER_PAGE); 
  pageNumber = Number(pageNumber)
  return (
      <ul className={styles.pager}>
        <li className={styles.arrow}><PagerArrow props={{category, pageNumber, totalPages, goLeft: true}} /></li>
        {(calculatePagerRange(pageNumber, totalPages).map(pageInPager => {
          return (
            <li key={pageInPager}>
              <NavLink 
                className={pageInPager===pageNumber ? styles.active : null}
                to={`/category/${category.id}/page/${pageInPager}`}>{pageInPager}
              </NavLink>
            </li>
          )
        }))}
        <li><PagerArrow props={{category, pageNumber, totalPages, goLeft: false}} /></li>
      </ul>
  )
}

function PagerArrow({ props }) {
  const { category, pageNumber, totalPages, goLeft } = props
  const goToPage = goLeft
    ? ( pageNumber > 1 ? pageNumber - 1 : 1 )
    : ( pageNumber < totalPages ? pageNumber + 1 : totalPages )
  const arrowIconDirection = goLeft ? 'left' : 'right'
  return (
      <NavLink to={`/category/${category.id}/page/${goToPage}`}>
        <i className={`fas fa-arrow-circle-${arrowIconDirection}`}></i>
      </NavLink>
  )
}

// I was already feeling pretty baller with the triple-ternary above,
// but the function below is the crowning achievement of my time at appAcademy.
// This function calculates the proper page numbers to display in the pagination slider, 
// given total number of pages, current page number, and size of pagination range
function calculatePagerRange(pageNumber, totalPages) {
  const NUM_PAGES = 5 // number of pages visible in pager
  // address edge cases
  if (pageNumber < 1) pageNumber = 1;
  if (totalPages <= NUM_PAGES) return Array.from(Array(totalPages).keys()).map(n => n+1)
  if (pageNumber > totalPages) pageNumber = totalPages; 
  if (pageNumber === totalPages || pageNumber + NUM_PAGES > totalPages) {
    return Array.from(Array(NUM_PAGES).keys()).map(n => n + totalPages - NUM_PAGES + 1) 
  }
  // ordinary cases
  let range;
  if (pageNumber % NUM_PAGES === 1) { // you are on first page
    range = Array.from(Array(NUM_PAGES).keys()).map(n => n + pageNumber)
  } else if (pageNumber % NUM_PAGES === 0) { // last page
    range = Array.from(Array(NUM_PAGES).keys()).map(n => pageNumber - n).reverse()
  } else { // you are somewhere in between end and start of block
    const delta = pageNumber % NUM_PAGES
    const lowerBound = pageNumber - delta + 1
    range = Array.from(Array(NUM_PAGES).keys()).map(n => lowerBound + n)
  }
  return range
}
