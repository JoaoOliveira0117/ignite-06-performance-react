import type { NextPage } from "next";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
};

type Results = {
  totalPrice: number;
  products: any[];
};

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    products: [],
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product: Product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = products.reduce((total: any, product: any) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, products });
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.products}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  );
};

export default Home;
