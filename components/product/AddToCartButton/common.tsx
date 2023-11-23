import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  url,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart, quantityProduct } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [
            {
              quantity: quantityProduct.value,
              price,
              item_url: url,
              item_name: name,
              discount: discount,
              item_id: productID,
              item_variant: name,
            },
          ],
        },
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      data-deco="add-to-cart"
      class={`max-w-[312px] btn px-[40px] border-0 text-white-lily text-uppercase text-[14px] tracking-[1px] font-medium bg-gradient-to-r from-[#FF8A77] to-[#FFBE9F] hover:from-soft-pink hover:to-soft-pink transition-all duration-300`}
    >
      Adicionar ao Carrinho
    </Button>
  );
}
