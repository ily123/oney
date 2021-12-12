import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from "react-router-dom";
import './DotDotButton.css'
import { deleteReview } from "../../store/review";

function DotDotButton({product_id, id}) {
  const dispatch = useDispatch();
  const history = useHistory();

  let productId = product_id

  // false = menu is hidden
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => { // invoked by the onClick in the html button, opens menu
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false); // trigger closing of dropdown menu
    };

    // register event listener for click events on the entire page (document)
    // so can close the dropdown menu if click anywhere on the page.
    document.addEventListener('click', closeMenu);

    // cleanup function for the useEffect should remove this event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

   const handleDeleteReview = (productId, id) => {
     dispatch(deleteReview(productId, id));
    history.push(`/products/${productId}`)
  }
  return (
    <>
      <button className="review-dot-dot" onClick={openMenu}>
        <div className="dotStyle">
          <i className="fas fa-ellipsis-h "></i>
        </div>
      </button>
      {showMenu && (
        <div className="review-dropdown">
          <div>
            <NavLink to={`/products/${productId}/reviews/${id}`}><div className="dot-edit"></div><i className="fas fa-edit"></i></NavLink>
          </div>
          <div>
            <button className="delete-review-button" onClick={() => {handleDeleteReview(productId, id)}}><i className="fas fa-trash "></i></button>
          </div>
        </div>
      )}
    </>
  )

}
export default DotDotButton
