import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/reducers/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="lg:flex lg:gap-8">
        <div className="lg:flex-grow">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm mb-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
              
              <div className="flex-grow">
                <Link to={`/product/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-red-600">
                  {item.title}
                </Link>
                <p className="text-gray-600 text-sm mt-1">${item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <MinusCircle size={20} />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
              
              <div className="text-right min-w-[100px]">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-600 mt-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-80 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-red-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;