import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCategoriesQuery } from './hooks/useCategoriesQuery';
import data from './data.js';

function App() {
  const [products, setProducts] = useState([]);
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <header>
        <a href='/'>MyCoolStore</a>
      </header>
      <main>
        <h1>list products</h1>
        <div className='products'>
          {data.products.map((product) => (
            <div className='product' key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className='product-info'>
                <a href={`/product/${product.slug}`}>
                  <p>{product.name}</p>{' '}
                </a>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
