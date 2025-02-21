import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import { addToCart } from '../store/reducers/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase">{product.category}</span>
              <h1 className="text-2xl font-bold text-gray-800 mt-2">{product.title}</h1>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-400">
                <Star size={20} fill="currentColor" />
                <span className="ml-2 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Truck className="text-gray-400 mr-2" size={24} />
                <div>
                  <h4 className="font-semibold text-sm">Free Delivery</h4>
                  <p className="text-xs text-gray-500">For orders over $100</p>
                </div>
              </div>
              <div className="flex items-center">
                <Shield className="text-gray-400 mr-2" size={24} />
                <div>
                  <h4 className="font-semibold text-sm">Secure Payment</h4>
                  <p className="text-xs text-gray-500">100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;