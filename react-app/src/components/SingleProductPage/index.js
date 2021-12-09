import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneProduct, deleteProduct, clearProducts} from '../../store/product'
import './singleProduct.css'

import HideReviewForm from '../HideReviewForm';


function SingleProductPage(){
    const history = useHistory();
    const dispatch = useDispatch()

    const productObject = useSelector((state)=>state.product)
    const indProjObj = Object.values(productObject)[0]
    console.log('productObject: ',productObject)
    console.log('indProjObj: ',indProjObj)
    const sessionUser = useSelector((state) => state.session.user);

    console.log('sessionUser: ', sessionUser)

    const {productId} = useParams()

    // console.log("product-raw", productObject)
    // console.log("product-values", product)

    const handleDelete = async(productId) => {
        await dispatch(deleteProduct(productId));
        history.push('/')
    }

    useEffect(()=>{
        dispatch(getOneProduct(productId))
        dispatch(clearProducts())
    }, [dispatch,productId])

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
        if (arr.length > 2) {
            return arr[1]
        } else {
            return arr[0]
        }
    })

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
                        <button>
                            Add to Cart
                        </button>
                    </div>
                    <div>
                        {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                            <NavLink to={`/products/${productId}/edit`} >Update</NavLink> 
                        }
                    </div>
                    <div className='deleteBtnDiv'>
                        {sessionUser && sessionUser?.id === indProjObj?.user_id &&
                            <button onClick={() => handleDelete(indProjObj?.id)} className='delButton'>Delete Product</button>
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
