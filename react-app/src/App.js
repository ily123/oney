import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SingleProductPage from './components/SingleProductPage';
import EditProductForm from './components/EditProductForm';
import EditOneReview from './components/EditOneReview';
import Top20Products from './components/Top20Products';
import AddProductForm from './components/AddProductForm'
import CategoryPage, { CategoryPageRedirectToPageOne } from './components/CategoryPage';
import Cart from './components/Cart';
import CategoryCard from './components/CategoryCard';
import SearchPage from './components/SearchPage';

import TestComponent from './components/TEST_COMPONENT';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation count={count} setCount ={setCount} open={open} setOpen={setOpen}/>
      <TestComponent />
      <main>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/products/:productId' exact={true}>
          <SingleProductPage count={count} setCount ={setCount} open={open} setOpen={setOpen}/>
        </Route>
        <ProtectedRoute path='/products/:productId/edit' exact={true}>
          <EditProductForm />
        </ProtectedRoute>
        <Route path='/products/:productId/reviews/:id' exact={true}>
          <EditOneReview />
        </Route>
        <Route path='/' exact={true} >
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <Top20Products />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </Route>
        <Route path='/category/:categoryId' exact={true} >
          <CategoryPageRedirectToPageOne />
        </Route>
        <Route path='/category/:categoryId/page/:pageNumber' exact={true} >
          <CategoryPage />
        </Route>
        {/* <Route path='/users/:userId/cart' exact={true} >
          <Cart />
        </Route> */}
        <ProtectedRoute path='/new-product' exact={true}>
          <AddProductForm />
        </ProtectedRoute>
        <Route path='/search/:tag' exact={true} >
          <SearchPage />
        </Route>
      </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
