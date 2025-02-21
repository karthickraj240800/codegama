import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, setSelectedCategory } from '../store/reducers/productsSlice';
import ProductCard from '../components/ProductCard';
import { X } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error, categories, selectedCategory } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const filteredProducts = selectedCategory
    ? items.filter(product => product.category === selectedCategory)
    : items;

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const clearFilter = () => {
    dispatch(setSelectedCategory(null));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          {selectedCategory && (
            <button
              onClick={clearFilter}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <X size={16} className="mr-1" />
              Clear filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;