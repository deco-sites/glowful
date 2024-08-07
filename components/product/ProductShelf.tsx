import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Layout as cardLayout } from "$store/components/product/ProductCard.tsx";
import ProductCard from "$store/islands/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

interface Banner {
  imageMobile: ImageWidget;
  imageDesktop: ImageWidget;
  altText?: string;
  /** @format html */
  text?: string;
  button?: {
    text?: string;
    url?: string;
  };
}

export interface Props {
  /** @description Ativa o banner no inicio dos produtos */
  allowBanner: boolean;
  banner?: Banner;
  products: Product[] | null;
  /**
   * @format html
   */
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
    directionProductsMobile?: "Row" | "Column";
    allowArrowDesktop?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  allowBanner,
  banner,
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();

  const idMobile = id + "mobile";
  const idDesktop = id + "desktop";
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full container flex flex-col lg:flex-row gap-[32px] items-start lg:p-0">
      {layout?.directionProductsMobile === "Row"
        ? (
          <>
            {/* MOBILE */}
            <div
              id={idMobile}
              class="container grid lg:hidden grid-cols-[48px_1fr_48px] gap-[32px] relative"
            >
              <Slider.PrevButton
                class={`${
                  layout.allowArrowDesktop ? "lg:flex" : "lg:hidden"
                } disabled:hidden flex w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute ${
                  allowBanner ? "top-[57%]" : "top-[35%]"
                } left-[20px] lg:left-0 transform -translate-y-1/2 z-[3]`}
              >
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                  class="text-white-lily"
                />
              </Slider.PrevButton>

              {allowBanner && (
                <div class=" flex lg:hidden relative w-full rounded-[15px] lg:min-w-[360px] col-start-1 col-end-4 ">
                  <Image
                    class="w-full lg:h-full h-[360px] relative lg:flex items-center justify-center object-cover"
                    src={banner?.imageMobile}
                    alt={banner?.altText}
                    decoding="async"
                    loading="lazy"
                    width={360}
                    height={600}
                  />

                  <div class="absolute w-full h-full top-0 right-0 flex flex-col justify-end items-center gap-[16px] py-[32px]">
                    {banner?.text && (
                      <h2
                        class="text-[32px] font-semibold text-white-lily font-banner"
                        dangerouslySetInnerHTML={{ __html: banner?.text }}
                      />
                    )}
                    {banner?.button && (
                      <a
                        class="px-[42px] py-[16px] bg-white-lily rounded-full border-none text-deep-beauty text-sm uppercase font-bold tracking-[1px] hover:bg-cherry-pop  hover:text-white-lily hover:border-none transition-all duration-300"
                        href={banner?.button.url}
                      >
                        {banner?.button.text}
                      </a>
                    )}
                  </div>
                </div>
              )}
              <Slider class="flex mb-[40px] lg:mb-0 justify-between gap-[30px] carousel carousel-center sm:carousel-end  col-span-full row-start-2 row-end-5">
                {products?.map((product, index) => (
                  <>
                    <Slider.Item
                      index={index}
                      class="carousel-item w-[296px] lg:w-[360px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
                    >
                      <ProductCard
                        product={product}
                        itemListName={title}
                        layout={cardLayout}
                        platform={platform}
                        index={index}
                      />
                    </Slider.Item>
                  </>
                ))}
              </Slider>

              <ul class="flex carousel justify-center col-span-full gap-4 z-10 row-start-4">
                {products?.map((_, index) => (
                  <li class="carousel-item">
                    <Slider.Dot index={index} bgWhite={false}>
                      <></>
                    </Slider.Dot>
                  </li>
                ))}
              </ul>

              <Slider.NextButton
                class={`${
                  layout.allowArrowDesktop
                    ? "lg:flex right-[10%]"
                    : "lg:hidden right-0"
                } disabled:hidden flex w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute ${
                  allowBanner ? "top-[57%]" : "top-[35%]"
                } right-[20px] lg:right-[10%] transform -translate-y-1/2 z-[1]`}
              >
                <Icon
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="text-white-lily"
                />
              </Slider.NextButton>

              <SliderJS rootId={idMobile} />
              <SendEventOnLoad
                event={{
                  name: "view_item_list",
                  params: {
                    item_list_name: title,
                    items: products.map((product) =>
                      mapProductToAnalyticsItem({
                        product,
                        ...useOffer(product.offers),
                      })
                    ),
                  },
                }}
              />
            </div>

            {/* DESKTOP */}
            <div
              id={idDesktop}
              class="container hidden lg:grid grid-cols-[48px_1fr_48px] gap-[32px] relative lg:p-0"
            >
              <Slider.PrevButton
                class={`${
                  layout.allowArrowDesktop ? "flex" : "hidden"
                } disabled:hidden flex w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 left-[20px] lg:left-0 transform -translate-y-1/2 z-[3]`}
              >
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                  class="text-white-lily"
                />
              </Slider.PrevButton>

              <Slider class="flex mb-[40px] lg:mb-0 justify-between gap-[30px] lg:gap-4 2xl:gap-8 lg:mr-1 xl:mr-0 carousel carousel-center sm:carousel-end  col-span-full row-start-2 row-end-5 ">
                {allowBanner && (
                  <Slider.Item index={0} class="carousel-item">
                    <div class="relative rounded-[15px] lg:w-[265px] 2xl:w-[360px]">
                      <Image
                        class="w-full lg:h-full h-[360px] relative lg:flex items-center justify-center object-cover rounded-2xl"
                        src={banner?.imageDesktop}
                        alt={banner?.altText}
                        decoding="async"
                        loading="lazy"
                        width={360}
                        height={600}
                      />

                      <div class="absolute w-full h-full top-0 right-0 flex flex-col justify-end items-center gap-[16px] py-[32px]">
                        {banner?.text && (
                          <h2
                            class="text-[32px] font-medium text-white-lily font-banner"
                            dangerouslySetInnerHTML={{ __html: banner?.text }}
                          />
                        )}
                        {banner?.button && (
                          <a
                            class="px-[42px] py-[16px] bg-white-lily rounded-full border-none text-deep-beauty text-sm uppercase font-bold tracking-[1px] hover:bg-cherry-pop  hover:text-white-lily hover:border-none transition-all duration-300"
                            href={banner?.button.url}
                          >
                            {banner?.button.text}
                          </a>
                        )}
                      </div>
                    </div>
                  </Slider.Item>
                )}
                {products?.map((product, index) => (
                  <Slider.Item
                    index={index + 1}
                    class="carousel-item w-[296px] xl:w-[265px] 2xl:w-[360px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0 "
                  >
                    <ProductCard
                      product={product}
                      itemListName={title}
                      layout={cardLayout}
                      platform={platform}
                      index={index + 1}
                    />
                  </Slider.Item>
                ))}
              </Slider>

              <Slider.NextButton
                class={`${
                  layout.allowArrowDesktop ? "lg:flex right-0" : "lg:hidden"
                } disabled:hidden flex w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 transform -translate-y-1/2 z-[1]`}
              >
                <Icon
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="text-white-lily"
                />
              </Slider.NextButton>

              <SliderJS rootId={idDesktop} />
              <SendEventOnLoad
                event={{
                  name: "view_item_list",
                  params: {
                    item_list_name: title,
                    items: products.map((product) =>
                      mapProductToAnalyticsItem({
                        product,
                        ...useOffer(product.offers),
                      })
                    ),
                  },
                }}
              />
            </div>
          </>
        )
        : null}
      {layout?.directionProductsMobile === "Column"
        ? products?.map((product, index) => (
          <div class="flex flex-col min-w-[296px] lg:min-w-[235px] lg:w-[22vw] 2xl:w-[25rem] lg:max-w-[300px] 2xl:max-w-[360px]">
            <ProductCard
              product={product}
              itemListName={title}
              layout={cardLayout}
              platform={platform}
              index={index}
            />
          </div>
        ))
        : null}
    </div>
  );
}

export default ProductShelf;
