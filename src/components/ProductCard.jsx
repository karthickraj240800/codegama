import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/reducers/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative pt-[100%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {product.title}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;