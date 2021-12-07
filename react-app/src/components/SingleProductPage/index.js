import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import {getOneProduct} from '../../store/product'

function SingleProductPage(){
    const dispatch = useDispatch()
    const productObject = useSelector((state)=>state.product)
    const product = Object.values(productObject)
    const {productId} = useParams()
    console.log("product-raw", productObject)
    console.log("product-values", product)
    useEffect(()=>{
        dispatch(getOneProduct(productId))
    }, [dispatch])

    return(
        <div>
            {product[0]?.title}
        </div>
    )
}

export default SingleProductPage
