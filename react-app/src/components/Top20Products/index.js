import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getTop20Products,clearProducts} from "../../store/product"
import ProductCard from '../ProductCard'
import './Top20Products.css'

const Top20Products = () => {
    const products = useSelector((state)=> Object.values(state.product))

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTop20Products())
        dispatch(clearProducts())
    },[dispatch])

    if (!products){
        return null
    }
    else {
        return (
            <div>
                <div className="nameTag">
                    Our top picks for you
                </div>
                <div className='topProducts'>
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

export default Top20Products;
