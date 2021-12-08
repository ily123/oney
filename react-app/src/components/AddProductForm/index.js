import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router";
import {addOneProduct} from "../../store/product";
import './AddProductForm.css'

const AddProductForm = () =>{

    const categoryTree = useSelector(state=>state.category)
    console.log(categoryTree)

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category,setCategory] = useState('68887312')
    const [image,setImage] = useState('')



    const dispatch = useDispatch();
    const history = useHistory();

    const handleCancel = () => {
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            price,
            category,
            image,
        }
    let createdProduct = await dispatch(addOneProduct(payload));
    if (createdProduct) {
    history.push(`/products/${createdProduct.id}`);
    }
    }


    return (
        <div className='add-Product-Div'>
            <h2>Let's get started! Tell us about your product</h2>
            <form onSubmit={handleSubmit} className='add-product'>
                <div>
                    <label>Product Title</label>
                    <input
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    placeholder='Enter Product Title'
                    required
                    />
                </div>
                <div>
                    <label>Product Description</label>
                    <textarea
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    placeholder='Enter Product Description'
                    required
                    />
                </div>
                <div>
                <label> Category </label>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value= "68887312" >Fine Art</option>
                    <option value= "68887366" >Handmade Holiday Items</option>
                    <option value="68887482">Handmade jewelry</option>
                </select>
                </div>
                <div>
                    <label>Product Price</label>
                    <input
                    onChange={(e)=>setPrice(e.target.value)}
                    value={price}
                    placeholder= "Price Per Product"
                    required
                    type="number"
                    min = "1"
                    max = "1000"
                    />
                </div>
                <div>
                    <label>Product Image</label>
                    <input
                    onChange={(e)=>setImage(e.target.value)}
                    value={image}
                    placeholder= "Product Image URL"
                    required
                    type="url"
                    />
                </div>
                <div className="button_div">
                    <button className='submit-button' type='submit'>
                        Submit
                    </button>
                    <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddProductForm;
