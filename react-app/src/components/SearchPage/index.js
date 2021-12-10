import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { search } from "../../store/search"
import ProductCard from '../ProductCard'
import './SearchPage.css'

const SearchPage = () => {
    const searchResults = useSelector((state)=>state.searchResults)
    const dispatch = useDispatch();

    const tag = searchResults?.searchTag

    // useEffect((tag)=>{
    //     dispatch(search(tag))
    // },[dispatch,tag])


    if(!searchResults?.products) {
        return (
            <h2>Search For A Product</h2>
        )
    }
    const products = Object.values(searchResults?.products)


    // console.log("tag is ===========",tag)

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
                    {products?.map(({id,price,images})=>(
                        <ProductCard
                            key={id}
                            id={id}
                            price={price}
                            images={images}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchPage;
