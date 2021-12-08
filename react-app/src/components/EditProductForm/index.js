// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { Redirect, useParams } from 'react-router-dom';
// import { editProduct } from '../../store/product';

// const EditProdForm = () => {
//   const [errors, setErrors] = useState([]);
//   const productObject = useSelector((state)=>state.product)
//   const indProjObj = Object.values(productObject)[0];
//   // const singleProd = Object.values(indProjObj);
//   // console.log(singleProd)
//   const sessionUser = useSelector((state) => state.session.user);

//   console.log('sessionUser: ', sessionUser)
//   const {id} = useParams()
//   // const prod = singleProd.find((product) => +imageId === image.id);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('')
//   // const [category, setCategory] = useState('');
  
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const productData = {
//       title,
//       description,
//       price
//       // category
//     };
    
//     return dispatch()
//     // return dispatch(editImage(imageId, imgData))
//     //   .then((res) => {
//     //     // console.log('this is res: ', res);
//     //     if (res.ok) {
//     //       setErrors([]);
//     //       history.push(`/images/${imageId}`);
//     //     }
//     //   })
//     //   .catch(async (res) => {
//     //     const data = await res.json();
//     //     if (data && data.errors) setErrors(data.errors);
//     //   })
//         // .then (if (errors.length < 1) history.push(`/images/${imageId}`);
//   };

//   // const onSignUp = async (e) => {
//   //   e.preventDefault();
//   //   if (password === repeatPassword) {
//   //     const data = await dispatch(signUp(username, email, password));
//   //     if (data) {
//   //       setErrors(data)
//   //     }
//   //   }
//   // };

//   // const updateUsername = (e) => {
//   //   setUsername(e.target.value);
//   // };

//   // const updateEmail = (e) => {
//   //   setEmail(e.target.value);
//   // };

//   // const updatePassword = (e) => {
//   //   setPassword(e.target.value);
//   // };

//   // const updateRepeatPassword = (e) => {
//   //   setRepeatPassword(e.target.value);
//   // };

//   if (sessionUser) {
//     return <Redirect to='/' />;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         {errors.map((error, ind) => (
//           <div key={ind}>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label>Title</label>
//         <input
//           type='text'
//           name='username'
//           // onChange={updateUsername}
//           // value={username}
//         ></input>
//       </div>
//       <div>
//         <label>Description</label>
//         <input
//           type='text'
//           name='email'
//           // onChange={updateEmail}
//           // value={email}
//         ></input>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type='password'
//           name='password'
//           // onChange={updatePassword}
//           // value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type='text'
//           name='repeat_password'
//           // onChange={updateRepeatPassword}
//           // value={repeatPassword}
//           // required={true}
//         ></input>
//       </div>
//       <button type='submit'>Submit</button>
//     </form>
//   );
// };

// export default EditProdForm;

import { useState} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { editAProduct } from "../../store/product";


const EditProductForm = () =>{
  const { id } = useParams();
  const product = useSelector((state) => state.product[id])
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

  const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
        title,
        description,
        price,
        category,
        image,
      }

    let editedProduct = await dispatch((editAProduct)(payload));

    if (editedProduct) {
    history.push(`/products/${editedProduct.id}`);
    }
  }

  let categories = [[68887312,"Fine Art"], [68887366, "Handmade Holiday Items"],[68887482,"Handmade jewelry"]]

  return (
    <div className='EditProductDiv'>
      <h2>Edit your product details</h2>
      <form onSubmit={handleSubmit} className='add-product'>
        <input
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        // placeholder='Enter Product Title'
        required
        />
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
        <input
        onChange={(e)=>setPrice(e.target.value)}
        value={price}
        // placeholder= "Price Per Product"
        required
        type="number"
        min = "1"
        max = "1000"
        />
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