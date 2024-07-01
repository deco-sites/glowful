import ProductSelector from "$store/islands/ProductVariantSelector.tsx";
import ChangeQuantityProduct from "$store/islands/ChangeQuantityProduct.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { useEffect } from "preact/hooks";
import Subscriptions from "./Subscriptions.tsx";
import { useUI } from "deco-sites/glowful/sdk/useUI.ts";
import { Discounts } from "$store/loaders/Discounts/Discounts.ts";

export interface Props {
  product: Product;
  discounts?: Discounts;
}

function PurchaseOptions({ product, discounts }: Props) {
  const platform = "shopify";

  const {
    url,
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const inventoryLevel = offers?.offers[0].inventoryLevel.value;

  useEffect(() => {
    const handleScroll = () => {
      const addToCartButton = document.getElementById("addToCartSection");
      const fixedCtaButton = document.getElementById("fixedCtaButton");

      if (addToCartButton || fixedCtaButton) {
        const rect = addToCartButton.getBoundingClientRect();
        if (rect.bottom < 0) {
          fixedCtaButton.style.bottom = "0px";
        } else {
          fixedCtaButton.style.bottom = "-70px";
        }
      }
    };

    self.addEventListener("scroll", handleScroll);
    return () => self.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div class="mt-[32px] sm:mt-[40px] w-full px-6 lg:px-0">
      <ProductSelector product={product} />

      <Subscriptions product={product} discounts={discounts} />

      <div
        class="mt-[24px] h-[40px]  p-[3px] flex rounded-full bg-[#000]"
        id="addToCartSection"
      >
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <ChangeQuantityProduct
                inventoryLevel={inventoryLevel}
                price={price}
              />

              <AddToCartButtonShopify
                url={url || ""}
                name={name}
                productID={productID}
                productGroupID={productGroupID}
                price={price}
                discount={discount}
              />
            </>
          )
          : (
            <p class="w-full h-full text-white-lily text-center leading-[2]">
              Produto indisponivel
            </p>
          )}
      </div>
      <div
        id="fixedCtaButton"
        class="lg:!hidden fixed bottom-0 left-0 w-screen py-[20px] bg-deep-beauty flex justify-center items-center transition-all duration-300 z-[9999]"
        style={{ bottom: "-70px" }}
      >
        {availability === "https://schema.org/InStock"
          ? (
            <AddToCartButtonShopify
              url={url || ""}
              name={name}
              productID={productID}
              productGroupID={productGroupID}
              price={price}
              discount={discount}
            />
          )
          : (
            <p class="w-full h-full text-white-lily text-center">
              Produto indisponivel
            </p>
          )}
      </div>
    </div>
  );
}

export default PurchaseOptions;
