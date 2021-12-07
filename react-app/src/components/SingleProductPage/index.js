import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import {getOneProduct} from '../../store/product'

function SingleProductPage(){
    const dispatch = useDispatch()
    const productObject = useSelector((state)=>state.product)
    
    const {productId} = useParams()

    // console.log("product-raw", productObject)
    // console.log("product-values", product)

    useEffect(()=>{
        dispatch(getOneProduct(productId))
    }, [dispatch])

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
    // console.log('imageGroupsArr: ', imageGroupsArr)
    // get array of the second image in each grouping
    const images = imageGroupsArr?.map((arr) => {
        return arr[1]
    })
    
// console.log('!!!!!',Object.values(product[0]?.images[0])[0])
    return(
        <div>
            <div>
                {/* {productImgsArr?.map(imageUrl =>
                    <div>
                        <img src={imageUrl} alt='product photos'></img>
                    </div>    
                )} */}
                {images.length ?  
                
                images?.map(imageUrl =>
                    <div>
                        <img src={imageUrl} alt='product photos'></img>
                    </div>    
                )
                : null
                }
            </div>
            <div>
                <img src={Object.values(product[0]?.images[0])[0]} alt='product photos'></img>
            </div>
            <div>
                <div>
                    {product[0]?.title}
                </div>
                <div>
                    ${product[0]?.price}
                </div>
            </div>
            <div>
                <h3>Description</h3>
                <p>
                    {product[0]?.description}
                </p>
            </div>
            <div>
                <button>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default SingleProductPage
