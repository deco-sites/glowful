import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart, displayTop } = useUI();
  const totalItems = items.length;

  let colorIcon;

  if (displayTop.value) {
    colorIcon = "text-white-lily";
  } else {
    colorIcon = "text-deep-beauty";
  }

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm bg-cherry-pop h-[1.2rem] border-cherry-pop${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <Button
        class="btn-circle btn-sm btn-ghost"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon
          id="ShoppingCart"
          size={24}
          strokeWidth={2}
          class={`${colorIcon} group-hover/hover:text-[#101820]`}
        />
      </Button>
    </div>
  );
}

export default CartButton;
