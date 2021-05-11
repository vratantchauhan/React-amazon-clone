import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import React, { useState, useEffect } from 'react';
// import Product from './components/Product.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import { useStateValue } from './components/StateProvider';
import Login from './components/Login';
import { auth } from './components/Firebase';

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [productAdded, setProductAdded] = useState([]);
  // const [{basket},dispatch] = useStateValue();

  const [{ }, dispatch] = useStateValue();

 // --------------Listner-----------------

  // will only run once when the app component loads.
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The USER IS >>> ', authUser);
      if (authUser) {
        //if user is logged in.
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //if user logged out.
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    
  }, [])

  //-----------------Listner-----------------

  return (
    <Router>
      <div className="App">

        <Switch>

          <Route path="/checkout">
            <Header />
            <Checkout totalPrice={totalPrice} totalItems={totalItems} />

          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home setTotalPrice={setTotalPrice} totalPrice={totalPrice} totalItems={totalItems} setTotalItems={setTotalItems} />

          </Route>
        </Switch>
        {/* <Product /> */}
      </div>
    </Router>

  );
}

export default App;
