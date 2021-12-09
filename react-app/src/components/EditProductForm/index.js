import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { editAProduct, getOneProduct } from "../../store/product";


const EditProductForm = () =>{
  const params = useParams();
  const { productId } = params;
  // const product = useSelector((state) => state?.product[productId])
  const product = useSelector((state) => state?.product[productId] ? state?.product[productId] : "")
  
  console.log('========= ', product)
  // console.log('the title:', product?.title)
  const [title, setTitle] = useState(product?.title ? product?.title : "");
  // console.log('!!!!!!!!',product?.title)
  const [description, setDescription] = useState(product.description ? product.description : "");
  const [price, setPrice] = useState(product.price ? product.price : "")
  const [category, setCategory] = useState(product.category_id ? product.category_id : "")
  // const [image, setImage] = useState(product?.image)
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user)
  // const user_id = sessionUser.id

  const dispatch = useDispatch();
  const history = useHistory();

  // const handleCancel = () => {
  //   history.push('/')
  // }

  useEffect(()=>{
    dispatch(getOneProduct(productId))
  }, [dispatch, productId])
  // const handleBackToProduct = () => {
  //   history.push(`/products/${id}`)
  // }

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category_id)
    }
  }, [dispatch, product])

  useEffect(() => {
    const validationErrs = [];
    if(title.length < 3 || !title) validationErrs.push("A title is required")
    console.log('this is the title: ', title)
    if(!description) validationErrs.push("A description is required")
    if(price > 1000 || price < 1) validationErrs.push("Price must be at least $1")
    console.log('This is the price:', price)
    if(!category) validationErrs.push("Please select a category!")

    setErrors(validationErrs)
    console.log('validationErrs: ',validationErrs)
  },[title,description,price,category])
  console.log('errors: ',errors)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      price,
      category,
    }

    let editedProduct = await dispatch((editAProduct(payload, productId)));
    console.log('editedProduct: ',editedProduct)
    if (editedProduct) {
      // setErrors(editedProduct)
      history.push(`/products/${editedProduct.id}`);
    }
    // console.log('------->', product);
    if (!product) return null;
    // setDescription(product?.description)
    // console.log('------->', product);
    // return await dispatch(editAProduct(payload, productId))
    //   .then((response) => {
    //     if (response) {
    //       setErrors([]);
    //       console.log('hello there, I\'m here')
    //       history.push(`/products/${productId}`);
    //     }
    //   })
    //   .catch(async (response) => {
    //     console.log('in errors block')
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
        <NavLink to={`/products/${productId}`} >Back</NavLink> 
      </div>
      <form onSubmit={handleSubmit} >
        <ul className='loginErrorsList'>
          {errors.map((error, idx) => <li key={idx} className='productErrors'>{error}</li>)}
        </ul>
        <label htmlFor='Title'>Title</label>
          <input
          onChange={(e)=>setTitle(e.target.value)}
          defaultValue={title}
          type="text"
          required
          />
        <label htmlFor='Description'>Description</label>
          <textarea
          onChange={(e)=>setDescription(e.target.value)}
          defaultValue={description}
          type="text"
          required
          />
        <label> Category </label>
        <select 
          onChange={(e)=>setCategory(e.target.value)}
          defaultValue={category}
          >
          <option value= "68887312" >Fine Art</option>
          <option value= "68887366" >Handmade Holiday Items</option>
          <option value="68887482">Handmade jewelry</option>
        </select>
        <label htmlFor='Price'>Price</label>
          <input
          onChange={(e)=>setPrice(e.target.value)}
          defaultValue={price}
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
        <NavLink to={`/products/${productId}`} >Cancel</NavLink> 
        {/* <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
          Cancel
        </button> */}
      </form>
    </div>
  )

}

export default EditProductForm;