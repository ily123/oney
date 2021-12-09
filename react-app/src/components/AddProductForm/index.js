import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router";
import {addOneProduct} from "../../store/product";
import './AddProductForm.css'

const AddProductForm = () =>{

    const categoryTree = useSelector(state=>state.category.tree)

    let categoryList = []
    function generateAllCategories(category, path){
        if (!category) return
        let pathCopy = path.slice()
        if (category.id !== "root" && category.id !== null) {
            pathCopy.push(category.short_name)
            categoryList.push(
                {
                    "id": category.id,
                    "display_name": pathCopy.join('-')
                }
            )
        }
        let children = category.children
        children.forEach(childCategory => {
            generateAllCategories(childCategory,pathCopy)
        });
    }

    generateAllCategories(categoryTree,[])

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category,setCategory] = useState(categoryList[0]?.id)
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
                    required
                    />
                </div>
                <div className="description_div">
                    <label>Product Description</label>
                    <textarea
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    required
                    />
                </div>
                <div>
                <label> Category </label>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    {(categoryList.map(category => {
                        return (
                            <option key={"newProductFormCategory-"+category.id} value={category.id}>{category.display_name}</option>
                        )
                    }))}
                </select>
                </div>
                <div>
                    <label>Price Per Product</label>
                    <input
                    onChange={(e)=>setPrice(e.target.value)}
                    value={price}
                    required
                    type="number"
                    min = "1"
                    max = "1000"
                    />
                </div>
                <div>
                    <label>Product Image URL</label>
                    <input
                    onChange={(e)=>setImage(e.target.value)}
                    value={image}
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
