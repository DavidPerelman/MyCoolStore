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
              <img src={product.image} alt={product.name} />
              <div className='product-info'>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
