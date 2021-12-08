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
