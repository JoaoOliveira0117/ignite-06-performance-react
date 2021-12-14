import { ProductItem } from "./ProductItem";
import { useMemo } from "react";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  const totalProce = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);

  return (
    <div>
      <h1>{totalProce}</h1>
      {results.map((product) => {
        return <ProductItem product={product} />;
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
 * useMemo / useCallback
 *
 */
