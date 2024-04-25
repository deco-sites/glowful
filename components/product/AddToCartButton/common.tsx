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
  variant?: string;
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

  return props.variant == "cta" ? (
    <Button
      {...btnProps}
      data-deco="add-to-cart"
      class={`w-full block bg-white-lily rounded-full px-[32px] xl:px-[18px] py-[14px] border-none text-deep-beauty text-[16px] uppercase font-bold tracking-[0.8px] hover:bg-cherry-pop  hover:text-white-lily hover:border-none transition-all duration-300`}
    >
      Adicionar ao Carrinho
    </Button>
  ) : (
    <Button
      {...btnProps}
      data-deco="add-to-cart"
      class={`sm:w-full flex-1 h-auto min-h-fit flex justify-center btn px-[20px] border-0 text-white-lily uppercase text-[14px] tracking-[4%] font-medium bg-transparent transition-all duration-300 hover:bg-transparent`}
    >
      Adicionar ao Carrinho
    </Button>
  );
}
