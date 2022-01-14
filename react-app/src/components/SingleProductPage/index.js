import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneProduct, deleteProduct, clearProducts} from '../../store/product'
import './singleProduct.css'
import HideReviewForm from '../HideReviewForm';
import { updateCartThunk,addToCartThunk, allCartItemsThunk } from '../../store/cart';

import { openCart, closeCart } from '../../store/cart';

function SingleProductPage({count, setCount, open, setOpen}){
    const history = useHistory();
    const dispatch = useDispatch()
    const cartItem = {};
    const showCart = useSelector((state) => state.cart.showCart);

    const productObject = useSelector((state)=>state.product)
    const indProjObj = Object.values(productObject)[0]
    const productImgsObj = Object.values(productObject)[0]

    const sessionUser = useSelector((state) => state.session.user);

    const {productId} = useParams()

    const user_id = sessionUser?.id


    const cartItemsObj = useSelector((state)=>state?.cart)
    const cartItems = Object?.values(cartItemsObj)

    let [quantity, setQuantity] = useState(cartItems[0]?.quantity);


    useEffect(() => {
        dispatch(allCartItemsThunk(user_id))
        return () => clearInterval(allCartItemsThunk(user_id));
      }, [dispatch, user_id, cartItems.length, count, productId, open])

    const [largeSelectedImg, setLargeSelectedImg] = useState(0);


    const handleDelete = async(productId) => {
        await dispatch(deleteProduct(productId));
        history.push('/')
    }

    const handleAddCartNonUser = async () => {
        history.push('/login')
    }

    useEffect(()=>{
        dispatch(getOneProduct(productId))
        dispatch(clearProducts())
    }, [dispatch,productId, open])


    const product = Object.values(productObject)
    if (!product.length) return null

    const prodImgsArr = Object.values(productImgsObj?.images)


     // grouping of images
    const imageGroupsArr = prodImgsArr?.map((obj) => {
        return Object.values(obj)
    })

    // get array of the second image in each grouping
    let images = imageGroupsArr?.map((arr) => {
        if (arr.length > 2) {
            return arr[1]
        } else {
            return arr[0]
        }
    })


    const checkCartItemQuantity = (productId) => {
        const toBeCartItem = cartItems?.filter(function(el){


            return el.product_id == productId
        });
        if(toBeCartItem) { // item exists in user's card already  ->
            // then we should be running an update
                 setQuantity(() => {
                    return quantity += 1
                })

                let id = toBeCartItem.id
                let editItem = {
                id, user_id, productId, quantity
                }

                dispatch(updateCartThunk(editItem, id, user_id))

        }
        else {
            return null
        }
    }

    const handleAddToCart = async(e) => {
        e.preventDefault();
        setCount(count+1)

        setOpen(true)

        let quantity =1

        let product_id = +productId
        const itemAddToCart = {
            user_id, product_id,quantity
        }

        let waitAddProduct = await dispatch(addToCartThunk(itemAddToCart, user_id))
        if(waitAddProduct) {
            dispatch(allCartItemsThunk(user_id)).then(()=>dispatch(openCart()))
        }

    }

    return(
        <div>
            <div className='editBackBtnDiv'>
                <NavLink to={`/`}
                className='editProdCancel singleProdBack'
                >Back to Main</NavLink>
            </div>
            <div className='mainImagesBox'>
                <div className='smallImagesBox'>
                    {images.length ?
                        images?.map((imageUrl, idx) =>
                            <div key={idx}>
                                <img src={imageUrl} alt='product photos' className='smallImg'
                                onClick={() => setLargeSelectedImg(idx)}></img>
                            </div>
                        ) : null
                    }
                </div>
                <div className='largeImageBox'>
                    <img src={images[largeSelectedImg]} alt='product photos' id='largeImage' className='largeImage'></img>
                </div>
                <div className='itemInfoBox'>
                    <div>
                        <h1 className='productTitle1 descriptionDiv'>
                            {product[0]?.title}
                        </h1>
                    </div>
                    <div>
                        <p className='productPrice'>${product[0]?.price}</p>
                    </div>
                    <div className='descriptionDiv'>
                        <p className='descriptionTitle'>Description</p>
                        <p className='productDescParagraph'>
                            {product[0]?.description}
                        </p>
                        <div className='shippingInfo'>
                            <p>Cost to ship: Free</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            {sessionUser &&
                                <button id='addToCartBtn'
                                    className={(cartItem ? " selected" : "")}
                                    onClick={handleAddToCart}
                                    >
                                    Add to Cart
                                </button>
                            }
                        </div>
                        {!sessionUser &&
                            <button onClick={() => handleAddCartNonUser()} className='submitBtn' >
                                Add to Cart
                            </button>
                        }
                    </div>
                    <div className='singleProdBottomBtnsDiv'>
                        <div className='singleProdUpdateDiv updateProductBtnDiv'>
                            {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                                <NavLink to={`/products/${productId}/edit`} className='updateProdButton'>Update</NavLink>
                            }
                        </div>
                        {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                            <button onClick={() => handleDelete(indProjObj?.id)} className='delButton '>Delete Product</button>
                        }
                    </div>
                </div>
            </div>
            <div className='reviewsAndDescriptionsDiv'>
                <div className='reviewsDiv'>
                    <HideReviewForm />
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage
