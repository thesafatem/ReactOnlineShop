import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Main from "./components/Main";
import Store from "./components/Store";
import Auth from "./components/authorization/Auth";
import Registration from "./components/authorization/Registration";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { products } from "./database/products";
import { ProductImage } from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { User } from "./database/User";
import { Product } from "./database/Product";
import { ThemeContext, LanguageContext } from "./context";
import { darkTheme, lightTheme } from "./theme";
import CartComponent from "./components/Cart";

const user: User = {
  id: 1,
  name: 'asdf',
  email: 'asdf@gmail.com',
  password: 'test1234',
  basket: []
};

function App() {
  const [users, setUsers] = useState<User[]>([user]);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  return (
    <ThemeContext.Provider value={lightTheme}>
      <LanguageContext.Provider value="EN">
        <Router>
          <Navbar curUser={loggedUser} logout={logout} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/main"/>
            </Route>
            <Route exact path="/store">
              <Store item={products} addItem={addItemToBasket} />
            </Route>
            <Route exact path="/cart">
              <Cart user={loggedUser} removeItem={removeItemFromBasket} />
            </Route>
            <Route
              exact
              path="/auth"
              component={() => <Auth login={authenticateUser} cancel={show} />}
            ></Route>
            <Route exact path="/register">
              <Registration registrate={createNewUser} cancel={show} />
            </Route>
            <Route exact path="/main">
              <Main />
            </Route>
            <Route exact path="/profile">
              <Profile curUser={loggedUser} />
            </Route>
            <Route exact path="/items/:id">
              <ProductDetails item={products} />
            </Route>
          </Switch>
        </Router>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );

  function createNewUser(user: User) {
    const checker = users.find((u) => u.email === user.email);
    if (checker) {
      return false;
    }
    user.id = users.length + 1;
    setUsers((users) => [...users, user]);
    console.log(users);
    return true;
  }

  function authenticateUser(user: User) {
    const checker = users.find(
      (u) => u.email === user.email && u.password == user.password
    );
    if (!checker) {
      return false;
    }
    user = checker;
    user.basket = [];
    setLoggedUser(user);
    console.log(loggedUser);
    return true;
  }

  function logout() {
    setLoggedUser(null);
  }

  function show() {
    return <Redirect to="/" />;
  }

  function addItemToBasket(product: Product) {
    if (loggedUser) {
      product.id = loggedUser.basket.length + 1;
      loggedUser.basket.push(product);
    }
  }

  function removeItemFromBasket(id: number) {
    if (loggedUser) {
      const basket = loggedUser.basket.filter((item, index) => {
        return id !== index;
      });

      setLoggedUser({...loggedUser, basket});
    }
  }
}

export default App;
