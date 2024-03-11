import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  idWidgetRebuy: string;
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  idWidgetRebuy,
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden z-20"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy ? (
        <div class="flex flex-col gap-6">
          <span class="font-medium text-2xl">Sua sacola está vazia</span>
          <Button
            class="btn-outline"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            Escolher produtos
          </Button>
        </div>
      ) : (
        <>
          {/* Free Shipping Bar */}
          <div class="px-[24px] lg:px-[32px] py-4 w-full">
            <FreeShippingProgressBar
              total={total}
              locale={locale}
              currency={currency}
              target={freeShippingTarget}
            />
          </div>

          {/* Cart Items */}
          <ul
            role="list"
            class="mt-6 px-[24px] lg:px-[32px] flex-grow overflow-y-auto flex flex-col gap-6 w-full"
          >
            {items.map((item, index) => (
              <li key={index}>
                <CartItem
                  item={item}
                  index={index}
                  locale={locale}
                  currency={currency}
                  onUpdateQuantity={onUpdateQuantity}
                  itemToAnalyticsItem={itemToAnalyticsItem}
                />
              </li>
            ))}

            {/* REBUY SCRIPT */}
            <script
              defer
              src="https://cdn.rebuyengine.com/onsite/js/rebuy.js?shop=20c805-5.myshopify.com"
            ></script>

            {/* REBUY CART */}
            <div>
              <div data-rebuy-id={idWidgetRebuy}></div>
            </div>
          </ul>

          {/* Cart Footer */}
          <footer class="w-full">
            {/* Subtotal */}
            <div class="border-t border-base-200 pt-[16px] flex flex-col">
              <div class="w-full flex justify-between px-[24px] lg:px-[32px]  text-sm">
                <span class="text-[14px] lg:text-[16px]">Subtotal</span>
                <span class="px-4">
                  {formatPrice(subtotal, currency, locale)}
                </span>
              </div>
            </div>

            <div class="p-[32px]">
              <a class="w-full flex justify-center" href={checkoutHref}>
                <Button
                  data-deco="buy-button"
                  class="h-fit w-fit bg-[#000] rounded-full border-none text-[#fff] text-sm uppercase px-[40px] py-[16px] lg:px-[60px] lg:py-[18px] font-bold tracking-[1px] hover:bg-cherry-pop hover:text-white-lily hover:border-none transition-all duration-300"
                  disabled={loading || isEmtpy}
                  onClick={() => {
                    sendEvent({
                      name: "begin_checkout",
                      params: {
                        coupon,
                        currency,
                        value: total - discounts,
                        items: items
                          .map((_, index) => itemToAnalyticsItem(index))
                          .filter((x): x is AnalyticsItem => Boolean(x)),
                      },
                    });
                  }}
                >
                  Finalizar compra
                </Button>
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default Cart;
