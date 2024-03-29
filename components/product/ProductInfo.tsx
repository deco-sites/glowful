import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import ProductImages from "$store/islands/ProductImages.tsx";
import { useUI } from "../../sdk/useUI.ts";
import PurchaseOptions from "$store/components/product/PurchaseOptions.tsx";

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
  /**
   * @description maximum value of installments, default 5x
   * @default "5"
   */
  installments?: number;
}

function ProductInfo({ page, layout, installments = 5 }: Props) {
  const platform = usePlatform();
  const id = useId();
  const { quantityInstallments, productId } = useUI();

  quantityInstallments.value = installments;

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
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const descriptionJson = description && JSON.parse(description);
  const inventoryLevel = offers?.offers[0].inventoryLevel.value;
  const images = product.isVariantOf?.image;

  const productGroupId = isVariantOf?.productGroupID;
  const parts = productGroupId?.split("/");
  const lastPart = parts[parts.length - 1];
  productId.value = lastPart;

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

        <PurchaseOptions product={product} />

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
