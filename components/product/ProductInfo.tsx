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
import ProductImages from "$store/islands/ProductImages.tsx";
import { useUI } from "../../sdk/useUI.ts";
import PurchaseOptions from "$store/islands/PurchaseOptions.tsx";
import FaqProduct from "$store/components/product/FaqProduct.tsx";
import ProductInfoCarousel from "$store/islands/ProductInfoCarousel.tsx";

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
  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;
  const descriptionJson = description && JSON.parse(description);
  const inventoryLevel = offers?.offers[0].inventoryLevel.value;
  const images = product.isVariantOf?.image;

  const productGroupId = isVariantOf?.productGroupID;
  const parts = productGroupId?.split("/");
  const lastPart = parts[parts.length - 1];
  productId.value = lastPart;

  const tag =
    isVariantOf?.hasVariant[0].isVariantOf.additionalProperty[0].value;

  return (
    <div class="relative flex flex-col  lg:flex-row items-start gap-[24px] md:gap-[50px] xl:gap-[55px] pt-[40px] lg:pt-[70px] md:w-full">
      <div class="lg:flex hidden flex-col w-full max-w-[740px]">
        <div class="hidden lg:block">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement}
            classes="lg:!mb-0"
          />
        </div>

        <ProductImages images={images} />

        <FaqProduct page={page} />
      </div>

      <div class="block lg:hidden px-[24px] w-screen overflow-scroll">
        <Breadcrumb itemListElement={breadcrumbList?.itemListElement} />
      </div>

      <div class="flex flex-col sticky top-[80px] sm:max-w-[380px] xl:max-w-[420px] w-full">
        {/* Carousel product - MOBILE */}
        <ProductInfoCarousel product={product} />

        {/* Code and name */}
        <div class="px-[24px] lg:px-0 mb-[20px] lg:mb-[24px] mt-[32px] lg:mt-0 flex flex-col gap-[16px] lg:gap-[20px]">
          <p class="text-[14px] lg:text-[16px]">{tag}</p>

          <h1>
            <span class="font-bold text-[#000] text-[24px] uppercase mb-[24px]">
              {layout?.name === "concat"
                ? `${isVariantOf?.name} ${name}`
                : layout?.name === "productGroup"
                ? isVariantOf?.name
                : name}
            </span>
          </h1>
        </div>

        {/* Diferentails */}
        <div class="px-[24px] lg:px-0 grid grid-cols-2 gap-[8px] lg:gap-[20px]">
          {descriptionJson &&
            descriptionJson.diferenciais.map((dif: Array<string>) => (
              <div class="flex gap-[8px]">
                <Icon id="CheckPdp" size={18} strokeWidth={1} />
                <p class="text-[12px]">{dif}</p>
              </div>
            ))}
        </div>

        {/* Sku Selector */}
        <PurchaseOptions product={product} />

        {/* FAQ */}
        <div class="block lg:hidden">
          <FaqProduct page={page} />
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
