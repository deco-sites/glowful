import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "$store/islands/ProductVariantSelector.tsx";
import ChangeQuantityProduct from "$store/islands/ChangeQuantityProduct.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import ProductImages from "$store/islands/ProductImages.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    url,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const descriptionJson = description && JSON.parse(description);
  const inventoryLevel = offers?.offers[0].inventoryLevel.value;
  const images = product.isVariantOf?.image;

  return (
    <div class="relative flex items-start gap-[50px] pt-[40px]">
      <ProductImages images={images} />
      <div class="flex flex-col px-[24px] sticky top-[60px]">
        {/* Code and name */}
        <div>
          <h1>
            <span class="font-semibold text-[#000] text-[24px] uppercase mb-[8px]">
              {layout?.name === "concat"
                ? `${isVariantOf?.name} ${name}`
                : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
            </span>
          </h1>
          <p></p>
        </div>

        {/* Description */}
        {descriptionJson.description && (
          <p class="text-[14px] font-fraunces font-light">
            {descriptionJson.description}
          </p>
        )}

        {/* Stars Reviews */}
        <p class="my-[16px]">Review Stars</p>

        {/* Carousel product - MOBILE */}
        <div
          id={id}
          class="lg:hidden grid grid-flow-row sm:grid-flow-col my-[55px]"
        >
          {/* Image Slider */}
          <div class="relative order-1 sm:order-2">
            <Slider class="carousel carousel-center gap-0 pr-[40px] w-full sm:w-[40vw]">
              {images?.map((img, index) => (
                <Slider.Item index={index} class="carousel-item w-full">
                  <Image
                    class="w-full"
                    sizes="(max-width: 640px) 100vw, 60vw"
                    src={img.url!}
                    alt={img.alternateName}
                    width={300}
                    height={300}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>

          <SliderJS rootId={id} />
        </div>

        {/* Diferentails */}
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-[8px] ">
          {descriptionJson &&
            descriptionJson.diferenciais.map((dif: Array<string>) => (
              <div class="flex gap-[8px]">
                <Icon
                  id="CheckPdp"
                  size={20}
                  strokeWidth={1}
                  class="text-[#1C8172]"
                />
                <p class="text-[14px] font-fraunces font-light">{dif}</p>
              </div>
            ))}
        </div>
        {/* Sku Selector */}
        <div class="mt-[55px] sm:mt-[32px]">
          <ProductSelector product={product} />
        </div>
        {/* Combos and Subscriber */}
        <p class="text-[16px] font-fraunces font-semibold my-[30px]">Combos:</p>

        {/* Prices */}
        {
          /* <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          <span class="font-medium text-xl text-secondary">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
      </div> */
        }

        {/* Quantity Items */}
        <ChangeQuantityProduct inventoryLevel={inventoryLevel} price={price} />

        {/* Add to Cart and Favorites button */}
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
        {/* Shipping Simulation */}
        <div class="mt-8">
          {platform === "vtex" && (
            <ShippingSimulation
              items={[
                {
                  id: Number(product.sku),
                  quantity: 1,
                  seller: seller,
                },
              ]}
            />
          )}
        </div>

        {/* Analytics Event */}
        <SendEventOnLoad
          event={{
            name: "view_item",
            params: {
              items: [
                mapProductToAnalyticsItem({
                  product,
                  breadcrumbList,
                  price,
                  listPrice,
                }),
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductInfo;
