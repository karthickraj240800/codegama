import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-red-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Code Gama</span>
          </Link>

          

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;