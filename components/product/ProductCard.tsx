import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import FlatDiscount from "$store/components/product/FlatDiscount.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "../../sdk/useUI.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 360;
const HEIGHT = 450;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const idContainer = useId();
  const id = `product-card-${productID}-${idContainer}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = isVariantOf?.image ?? [];
  const { listPrice, price } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const description = JSON.parse(
    product.description || isVariantOf?.description || "{}"
  );


  const { quantityInstallments } = useUI()
  const priceInstallments = price ? (price / quantityInstallments.value) : null

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="w-full block bg-white-lily rounded-full px-[32px] py-[14px] border-none text-deep-beauty text-[16px] uppercase text-center font-bold tracking-[0.8px] hover:bg-cherry-pop  hover:text-white-lily hover:border-none transition-all duration-300"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group self-start w-full max-w-[360px] min-w-[290px] ${align === "center" ? "text-center" : "text-start"
        } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />

      {/* Image Mobile */}
      <figure
        class="!flex lg:!hidden relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >


        <figcaption
          class={`
          absolute bottom-1 left-0 justify-end w-full flex flex-col gap-3 p-2 ${l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
            }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>

      {/* Image Desktop */}
      <figure
        class="!hidden lg:!flex relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
            }
          ${l?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
            }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>

        {/* Product Images */}
        <div class="grid grid-cols-1 grid-rows-1 w-full relative">
          <FlatDiscount
            listPrice={listPrice ?? 0}
            price={price ?? 0}
            absolutePosition
          />

          {/* TODO - Get flag Shopify */}
          <div
            className={`flex justify-center items-center px-[20px] py-[5px] text-[#101820] bg-white-lily text-center text-[14px] font-semibold leading-[130%] tracking-[1px] absolute top-[20px] left-[20px] z-10 rounded-[8px]`}
          >
            NOVO
          </div>

          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded-[15px] w-full object-cover ${l?.onMouseOver?.image == "Zoom image"
              ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
              : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
              <>
                <Image
                  src={back?.url ?? front.url!}
                  alt={back?.alternateName ?? front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  class="bg-base-100 col-span-full row-span-full transition-opacity rounded-[15px] w-full opacity-0 lg:group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                  decoding="async"
                />

                {!l?.hide?.cta ? (
                  <div
                    class={`lg:block hidden absolute bottom-[32px] px-[32px] xl:px-[18px] w-full h-fit opacity-0 group-hover:opacity-100 transition-all duration-300 ${l?.onMouseOver?.showCta ? "lg:hidden" : ""
                      }`}
                  >
                    <AddToCartButtonShopify
                      url={url || ""}
                      name={name}
                      productID={productID}
                      productGroupID={productGroupID}
                      price={price}
                      variant="cta"
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
        </div>

        <figcaption
          class={`
          absolute bottom-1 left-0 justify-end w-full flex flex-col gap-3 p-2 ${l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
            }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>

      {/* Prices & Name */}
      <div class="flex-auto flex flex-col pt-[24px]">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
            <>
              {l?.hide?.skuSelector ? (
                ""
              ) : (
                <ul
                  class={`flex items-center gap-2 w-full overflow-auto p-3 ${align === "center" ? "justify-center" : "justify-start"
                    } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
            </>
          )}

        <div class="flex justify-between items-center">
          <a
            class="w-full flex flex-col gap-[8px] max-w-[224px] "
            href={url && relative(url)}
            aria-label="view product"
          >
            {/* Category */}
            <p class="text-[14px] lg:text-[16px] leading-[13px] font-semibold text-[#101820]">
              {description.category}
            </p>

            {/* Product Name */}
            {l?.hide?.productName ? (
              ""
            ) : (
              <h2
                class=" break-words text-[18px] lg:text-[20px] leading-[130%] uppercase font-semibold text-[#101820]"
                dangerouslySetInnerHTML={{
                  __html: isVariantOf?.name ?? name ?? "",
                }}
              />
            )}
          </a>

          {/* Prices */}
          {l?.hide?.allPrices ? (
            ""
          ) : (
            <div class="flex flex-col gap-2">
              <div
                class={`flex flex-col gap-2 items-end w-fit ${l?.basics?.oldPriceSize === "Normal"
                  ? ""
                  : "flex-row lg:gap-2"
                  } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                <div
                  class={`text-[14px] font-normal leading-[13px] uppercase line-through text-[#101820] ${l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                    }`}
                >
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div class="lg:text-[20px] text-[18px] leading-[20px] uppercase font-bold text-[#CE0F69] ">
                  {formatPrice(price, offers?.priceCurrency)}
                </div>
              </div>
              {l?.hide?.installments && priceInstallments && (
                <p class ="text-sm  text-[#101820] text-end font-medium">
                  {quantityInstallments.value + "x " + formatPrice(priceInstallments, offers?.priceCurrency)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {l?.hide?.productDescription ? (
          ""
        ) : (
          <div
            class="mt-[16px] text-[14px] lg:text-[16px] font-light leading-[150%] text-[#101820]"
            dangerouslySetInnerHTML={{ __html: description.description ?? "" }}
          />
        )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? (
              ""
            ) : (
              <ul
                class={`flex items-center gap-2 w-full ${align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
