import { ProductItem } from "./ProductItem";
import { useMemo } from "react";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  return (
    <div>
      <h1>{totalPrice}</h1>
      {results.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList}
          />
        );
      })}
    </div>
  );
}

/** CICLO DO REACT //////////////////////////////////////////
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 */

/** Quando utilizar MEMO
 * 1. Pure Functional Components
 * 2. Components that renders too often
 * 3. Re-renders with same props
 * 4. Medium to large sized component
 */

/**
 * useMemo
 *
 * 1. Calculos Pesados
 * 2. Igualdade referencial (quando repasssa aquela informação a um componente filho)
 *
 * useCallback
 */
