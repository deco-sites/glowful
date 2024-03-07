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

export interface Props {
  product: Product;
}

function PurchaseOptions(
  { product }: Props,
) {
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
  const {
    price = 0,
    listPrice,
    seller = "1",
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const inventoryLevel = offers?.offers[0].inventoryLevel.value;
  return (
    <div class="mt-[55px] sm:mt-[32px]">
      <ProductSelector product={product} />
      <ChangeQuantityProduct inventoryLevel={inventoryLevel} price={price} />

      {/* Opções de Compra */}

      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                  />
                  <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
    </div>
  );
}

export default PurchaseOptions;
