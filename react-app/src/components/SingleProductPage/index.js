import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneProduct, deleteProduct, clearProducts} from '../../store/product'
import './singleProduct.css'
import HideReviewForm from '../HideReviewForm';
import { addToCart } from '../../store/cart';

function SingleProductPage(){
    const history = useHistory();
    const dispatch = useDispatch()
    const cartItem = {};

    const productObject = useSelector((state)=>state.product)
    const indProjObj = Object.values(productObject)[0]
    console.log('productObject: ',productObject)
    const productImgsObj = Object.values(productObject)[0]
    console.log('productImgsObj',productImgsObj)
    // console.log('indProjObj: ',indProjObj)
    const sessionUser = useSelector((state) => state.session.user);

    const [largeSelectedImg, setLargeSelectedImg] = useState(0);
    const[imageIdName, setImageIdName] = useState();

    const {productId} = useParams()


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
    }, [dispatch,productId])

    const product = Object.values(productObject)
    if (!product.length) return null

    const prodImgsArr = Object.values(productImgsObj?.images)
    console.log('prodImgsArr: ', prodImgsArr)

     // grouping of images
    const imageGroupsArr = prodImgsArr?.map((obj) => {
        return Object.values(obj)
    })
    
    // get array of the second image in each grouping
    let images = imageGroupsArr?.map((arr) => {
        // console.log('arr ',arr,'arr[0]: ',arr[1], 'arr[1]',arr[0])
        if (arr.length > 2) {
            return arr[1]
        } else {
            return arr[0]
        }
    })

    // let clickedPhoto;
    // function imageClick(e) {
    //     images.foreach(image => image.style.opacity = .3)
    // }

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
                        <div>
                            {sessionUser &&
                                // <button className='submitBtn' >
                                //     Add to Cart
                                // </button>
                                <button id='addToCartBtn'
                                    className={(cartItem ? " selected" : "")} 
                                    onClick={() => dispatch(addToCart(+productId))}
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
