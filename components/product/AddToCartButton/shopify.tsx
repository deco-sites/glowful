import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export type Props = Omit<BtnProps, "onAddItem" | "platform">;

function AddToCartButton(props: Props) {
  const { displayCart, quantityProduct } = useUI();
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      lines: {
        quantity: quantityProduct.value,
        merchandiseId: props.productID,
      },
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
