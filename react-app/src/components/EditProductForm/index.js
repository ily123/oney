import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { editAProduct, getOneProduct } from "../../store/product";


const EditProductForm = () =>{
  const params = useParams();
  const { productId } = params;
  const product = useSelector((state) => state?.product[productId])
  
  console.log('========= ', product)
  console.log('the title:', product?.title)
  const [title, setTitle] = useState(product?.title);
  console.log('!!!!!!!!',product?.title)
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price)
  const [category, setCategory] = useState(product?.category_id)
  // const [image, setImage] = useState(product?.image)
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancel = () => {
    history.push('/')
  }

  useEffect(()=>{
    dispatch(getOneProduct(productId))
  }, [dispatch, productId])
  // const handleBackToProduct = () => {
  //   history.push(`/products/${id}`)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price,
      category,
      
    }

    let editedProduct = await dispatch((editAProduct(payload, productId)));

    if (editedProduct) {
    history.push(`/products/${editedProduct.id}`);
    }
    // console.log('------->', product);
    if (!product) return null;
    // setDescription(product?.description)
    // console.log('------->', product);

    // return dispatch(editAProduct(payload, productId))
    //   .then((response) => {
    //     if (response.ok) {
    //       setErrors([]);
    //       history.push(`/products/${productId}`);
    //     }
    //   })
    //   .catch(async (response) => {
    //     const data = await response.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   })
  }

  let categories = [[68887312,"Fine Art"], [68887366, "Handmade Holiday Items"],[68887482,"Handmade jewelry"]]

  

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className='EditProductDiv'>
      <h2>Edit your product details</h2>
      <div>
        <NavLink to={`/products/${productId}`} key={productId}>Back</NavLink>
      </div>
      <form onSubmit={handleSubmit} >
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label htmlFor='Title'>Title</label>
          <input
          onChange={(e)=>setTitle(e.target.value)}
          defaultValue={product?.title}
          // placeholder='Enter Product Title'
          required
          />
        <label htmlFor='Description'>Description</label>
          <textarea
          onChange={(e)=>setDescription(e.target.value)}
          defaultValue={product?.description}
          // placeholder='Enter Product Description'
          required
          />
        <label> Category </label>
        <select 
          onChange={(e)=>setCategory(e.target.value)}
          defaultValue={product?.category_id}
          >
          <option value= "68887312" >Fine Art</option>
          <option value= "68887366" >Handmade Holiday Items</option>
          <option value="68887482">Handmade jewelry</option>
        </select>
        <label htmlFor='Price'>Price</label>
          <input
          onChange={(e)=>setPrice(e.target.value)}
          defaultValue={product?.price}
          // placeholder= "Price Per Product"
          required
          type="number"
          min = "1"
          max = "1000"
          />
        {/* <label htmlFor='Images'>Image(s)</label>
          <input
          onChange={(e)=>setImage(e.target.value)}
          defaultValue={product?.image}
          // placeholder= "Product Image URL"
          required
          type="url"
          /> */}
        <button className='submit-button' type='submit'>
          Submit
        </button>
        <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
          Cancel
        </button>
      </form>
    </div>
  )

}

export default EditProductForm;