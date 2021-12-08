import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import {getOneProduct} from '../../store/product'

import HideReviewForm from '../HideReviewForm';


function SingleProductPage(){
    const dispatch = useDispatch()

    const productObject = useSelector((state)=>state.product)
    const product = Object.values(productObject)
    const {productId} = useParams()
    // console.log("product-raw", productObject)
    // console.log("product-values", product)

    useEffect(()=>{
        dispatch(getOneProduct(productId))
    }, [dispatch, productId])


    return(
        <>
        {product[0]?.title}


        <HideReviewForm />
        </>
    )
}

export default SingleProductPage
