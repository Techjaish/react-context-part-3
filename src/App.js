import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCardItem = listItem => {
    this.state(prevState => ({cartList: [...prevState.cartList, listItem]}))
  }

  deleteCardItem = () => {}

  render() {
    const {carList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            carList,
            addCardItem: this.addCardItem,
            deleteCardItem: this.deleteCardItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
