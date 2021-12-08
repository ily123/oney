import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import {getOneProduct} from '../../store/product'
import './singleProduct.css'
import { useHistory } from 'react-router';
import HideReviewForm from '../HideReviewForm';
import { addToCart } from '../../store/cart';

function SingleProductPage(){
    const dispatch = useDispatch()
    const cartItem = {};

    const history = useHistory();
    const productObject = useSelector((state)=>state.product)

    const {productId} = useParams()

    const sessionUser = useSelector((state) => state.session);
    const user_id = sessionUser?.user.id

    // console.log("product-raw", productObject)
    // console.log("product-values", product)

    useEffect(()=>{
        dispatch(getOneProduct(productId))
    }, [dispatch, productId])

    // console.log("productId in single producePage", productId)

    const product = Object.values(productObject)
    if (!product.length) return null

    // iterate through each object in the array (gets you an object)
    // turn it into an array of the object's values
    // get the second item
    const productImgsObj = Object.values(productObject)[0]
    // console.log('productImgsObj: ',productImgsObj)
    const prodImgsArr = Object.values(productImgsObj.images)
    // console.log('prodImgsArr: ', prodImgsArr)

     // grouping of images
    const imageGroupsArr = prodImgsArr?.map((obj) => {
        return Object.values(obj)
    })
    console.log('imageGroupsArr ',imageGroupsArr)
    // console.log('imageGroupsArr: ', imageGroupsArr)
    // get array of the second image in each grouping
    const images = imageGroupsArr?.map((arr) => {
        console.log('arr ',arr,'arr[0]: ',arr[1], 'arr[1]',arr[0])
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
    return(

        <div>
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

                        <button
                            className={(cartItem ? " selected" : "")}
                            onClick={() => dispatch(addToCart(+productId))}
                            >
                            Add to Cart
                        </button>
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
