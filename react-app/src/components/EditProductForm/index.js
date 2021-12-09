import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams, useHistory, NavLink } from "react-router-dom";
import { editAProduct, getOneProduct } from "../../store/product";


const EditProductForm = () =>{
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

  const params = useParams();
  const { productId } = params;
  // const product = useSelector((state) => state?.product[productId])
  const product = useSelector((state) => state?.product[productId] ? state?.product[productId] : "")
  
  // console.log('========= ', product)
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
    if(!description) validationErrs.push("A description is required")
    if(price > 1000 || price < 1) validationErrs.push("Price must be at least $1")
    if(!category) validationErrs.push("Please select a category!")

    setErrors(validationErrs)
  },[title, description, price, category])


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

    if (!product) return null;

  }

  // let categories = [[68887312,"Fine Art"], [68887366, "Handmade Holiday Items"],[68887482,"Handmade jewelry"]]

  

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
          value={title}
          type="text"
          required
          />
        <label htmlFor='Description'>Description</label>
          <textarea
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          type="text"
          required
          />
        <label> Category </label>
          <select 
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            >
            {(categoryList.map(category => {
              return (
                <option key={"newProductFormCategory-"+category?.id} value={category.id}>{category.display_name}</option>
              )
            }))}
          </select>
        {/* <label> Category </label>
        <select 
          onChange={(e)=>setCategory(e.target.value)}
          value={category}
          >
          <option value= "68887312" >Fine Art</option>
          <option value= "68887366" >Handmade Holiday Items</option>
          <option value="68887482">Handmade jewelry</option>
        </select> */}
        <label htmlFor='Price'>Price</label>
          <input
          onChange={(e)=>setPrice(e.target.value)}
          value={price}
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