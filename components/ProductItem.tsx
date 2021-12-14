import { memo, useState } from "react";
import dynamic from "next/dynamic";
//import { AddProductToWishlist } from "./AddProductToWishlist";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
    //apenas adicionar o then quando nao for export default
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

// shallow compare -> comparação rasa

// {} === {} // false
// igualdade referencial

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishList && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => {
            setIsAddingToWishList(false);
          }}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product); // Compara se os dois objetos são iguais.
  }
);
