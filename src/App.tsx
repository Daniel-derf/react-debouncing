import "./App.css";
import { useEffect, useRef, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const getProducts = async (search: string = "") => {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: 49.99,
      category: "Accessories",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 129.99,
      category: "Accessories",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Smartphone",
      price: 699.99,
      category: "Electronics",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Smartwatch",
      price: 199.99,
      category: "Wearables",
      image: "https://via.placeholder.com/150",
    },
  ];

  if (search) {
    console.log("search");

    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return filteredProducts;
  }

  return products;
};

const useDebouncedGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  const searchTimeout = useRef<any>(undefined);

  useEffect(() => {
    searchTimeout.current = setTimeout(async () => {
      const products = await getProducts(search);

      setProducts(products);
    }, 1000);

    return () => clearTimeout(searchTimeout.current);
  }, [search]);

  return { products, search, setSearch };
};

function App() {
  const { products, search, setSearch } = useDebouncedGetProducts();

  return (
    <>
      Search: <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
      <br />
      <h1>PRODUCTS:</h1>
      {products.map((product) => (
        <>
          <h3>{product.name}</h3>
        </>
      ))}
    </>
  );
}

export default App;
