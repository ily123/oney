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
    // console.log('productObject: ',productObject)
    // console.log('indProjObj: ',indProjObj)
    const sessionUser = useSelector((state) => state.session.user);
    // console.log('sessionUser: ', sessionUser)
    const {productId} = useParams()
    // const sessionUser = useSelector((state) => state.session);
    const user_id = sessionUser?.id
    // console.log("product-raw", productObject)
    // console.log("product-values", productObject)

    const cartItemsObj = useSelector((state)=>state?.cart)
    const cartItems = Object?.values(cartItemsObj)

    console.log("users cart items", cartItems)
    let [quantity, setQuantity] = useState(cartItems[0]?.quantity);
    // console.log("users cart items", cartItems[0]?.quantity)


    useEffect(() => {
        dispatch(allCartItemsThunk(user_id))
        return () => clearInterval(allCartItemsThunk(user_id));
      }, [dispatch, user_id, cartItems.length, count, productId, open])


    const handleDelete = async(productId) => {
        await dispatch(deleteProduct(productId));
        history.push('/')
    }

    useEffect(()=>{
        dispatch(getOneProduct(productId))
        dispatch(clearProducts())
    }, [dispatch,productId, open])


    const product = Object.values(productObject)
    if (!product.length) return null

    // iterate through each object in the array (gets you an object)
    // turn it into an array of the object's values
    // get the second item
    const productImgsObj = Object.values(productObject)[0]
    // console.log('productImgsObj: ',productImgsObj)
    const prodImgsArr = Object.values(productImgsObj?.images)
    // console.log('prodImgsArr: ', prodImgsArr)

     // grouping of images
    const imageGroupsArr = prodImgsArr?.map((obj) => {
        return Object.values(obj)
    })
    // console.log('imageGroupsArr ',imageGroupsArr)
    // console.log('imageGroupsArr: ', imageGroupsArr)
    // get array of the second image in each grouping
    const images = imageGroupsArr?.map((arr) => {
        // console.log('arr ',arr,'arr[0]: ',arr[1], 'arr[1]',arr[0])
        if (arr.length > 2) {
            return arr[1]
        } else {
            return arr[0]
        }
    })

    // const addToCart = (user_id) => {
    //     history.push(`/users/${user_id}/cart`)
    // }

// console.log('!!!!!',Object.values(product[0]?.images[0])[0])
// console.log("users cart items", cartItems[0]?.quantity)




    const checkCartItemQuantity = (productId) => {
        const toBeCartItem = cartItems?.filter(function(el){
            // console.log("el.product_id", el.product_id)
            // console.log("productId", productId)

            return el.product_id == productId
        });
        if(toBeCartItem) { // item exists in user's card already  ->
            // then we should be running an update
            console.log("toBeCartItem", toBeCartItem[0]?.quantity)

                 setQuantity(() => {
                    return quantity += 1
                })
                console.log("quantity after set", quantity)
                let id = toBeCartItem.id
                let editItem = {
                id, user_id, productId, quantity
                }
                // console.log("handlesubmit", editItem, quantity)
                dispatch(updateCartThunk(editItem, id, user_id))
            // await
            // return toBeCartItem[0]?.quantity
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
        console.log("waitAddProduct", waitAddProduct)

        if(waitAddProduct) {
            dispatch(openCart())


        }

    }

    return(
        <div>
            <div className='editBackBtnDiv'>
                <NavLink to={`/`}
                className='editProdCancel singleProdBack'
                >Back</NavLink>
            </div>
            <div className='mainImagesBox'>
                <div className='smallImagesBox'>
                    {images.length ?
                        images?.map(imageUrl =>
                            <div key={imageUrl}>
                                <img src={imageUrl} alt='product photos' className='smallImg'></img>
                            </div>
                        ) : null
                    }
                </div>
                <div className='largeImageBox'>
                    {/* <img src={Object.values(product[0]?.images[0])[0]} alt='product photos' className='largeImage'></img> */}
                    <img src={images[0]} alt='product photos' className='largeImage'></img>
                </div>
                <div className='itemInfoBox'>
                    <div>
                        <h1 className='productTitle descriptionDiv'>
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

                        {/* <button
                        >
                        </button> */}
                        <button className='submitBtn'
                            className={(cartItem ? " selected" : "")}
                            onClick={handleAddToCart}
                            >
                            Add to Cart
                        </button>
                    </div>
                    <div className='singleProdBottomBtnsDiv'>
                        <div className='singleProdUpdateDiv'>
                            {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                                <NavLink to={`/products/${productId}/edit`} className='editProdCancel'>Update</NavLink>
                            }
                        </div>
                        {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                            <button onClick={() => handleDelete(indProjObj?.id)} className='delButton editProdCancel'>Delete Product</button>
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
