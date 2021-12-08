import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { editAProduct, getOneProduct } from "../../store/product";


const EditProductForm = () =>{
  const params = useParams();
  const { id } = params;
  const product = useSelector((state) => state.product[id])
  const productObject = useSelector((state)=>state.product)
  console.log('========= ',productObject)
  const [title,setTitle] = useState(product?.title);
  const [description,setDescription] = useState(product?.description)
  const [price, setPrice] = useState(product?.price)
  const [category, setCategory] = useState(product?.category)
  const [image, setImage] = useState(product?.image)
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCancel = () => {
    history.push('/')
  }

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
      image,
    }

    // let editedProduct = await dispatch((editAProduct)(payload));

    // if (editedProduct) {
    // history.push(`/products/${editedProduct.id}`);
    // }
    return dispatch(editAProduct(payload, id))
      .then((response) => {
        if (response.ok) {
          setErrors([]);
          history.push(`/products/${id}`);
        }
      })
      .catch(async (response) => {
        const data = await response.json();
        if (data && data.errors) setErrors(data.errors);
      })
  }

  let categories = [[68887312,"Fine Art"], [68887366, "Handmade Holiday Items"],[68887482,"Handmade jewelry"]]

  useEffect(()=>{
        dispatch(getOneProduct(id))
  }, [dispatch])

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className='EditProductDiv'>
      <h2>Edit your product details</h2>
      <div>
        <NavLink to={`/products/${id}`} key={id}>Back</NavLink>
      </div>
      <form onSubmit={handleSubmit} >
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='loginErrors'>{error}</li>)}
        </ul>
        <label htmlFor='Title'>Title</label>
          <input
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          // placeholder='Enter Product Title'
          required
          />
        <label htmlFor='Description'>Description</label>
          <textarea
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          // placeholder='Enter Product Description'
          required
          />
        <label> Category </label>
        <select onChange={(e)=>setCategory(e.target.value)}>
          <option value= "68887312" >Fine Art</option>
          <option value= "68887366" >Handmade Holiday Items</option>
          <option value="68887482">Handmade jewelry</option>
        </select>
        <label htmlFor='Price'>Price</label>
          <input
          onChange={(e)=>setPrice(e.target.value)}
          value={price}
          // placeholder= "Price Per Product"
          required
          type="number"
          min = "1"
          max = "1000"
          />
        <label htmlFor='Images'>Image(s)</label>
          <input
          onChange={(e)=>setImage(e.target.value)}
          value={image}
          // placeholder= "Product Image URL"
          required
          type="url"
          />
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