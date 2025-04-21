import React, { createContext, useReducer, useContext } from "react";
import "./styles.css";

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

const ProductList = () => {
  const { dispatch } = useCart();

  const products = [
    { id: 1, name: "Book", price: 2000 },
    { id: 2, name: "Laptop", price: 150000 },
    { id: 3, name: "Headphones", price: 12000 },
  ];

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <span>
            {product.name} - {product.price}₸
          </span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

const Cart = () => {
  CartProvider;
  const { cart, dispatch } = useCart();
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>
              {item.name} - {item.price}₸
            </span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
};
 
const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <h1>Shopping Cart</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;