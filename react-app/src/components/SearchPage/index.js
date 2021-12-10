import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { search } from "../../store/search"
import ProductCard from '../ProductCard'
import './SearchPage.css'
import {useParams} from 'react-router-dom';

const SearchPage = () => {
    const searchResults = useSelector((state)=>state.searchResults)
    const dispatch = useDispatch();

    const {tag} = useParams()

    useEffect(()=>{
        dispatch(search(tag))
    },[dispatch,tag])

    //on first load the state will be empty
    if(!searchResults?.products) {
       return null
    }
    const products = Object.values(searchResults?.products)


    if (!products.length){
        return (
            <h2>No products found for "{tag}"</h2>
        )
    }
    else {
        return (
            <div>
                <div className="searchTag">
                    Search Results For "{tag}"
                </div>
                <div className='searchProducts'>
                    {products?.map(({id,price,images,title})=>(
                        <ProductCard
                            key={id}
                            id={id}
                            price={price}
                            images={images}
                            title={title}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchPage;
