import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "deco-sites/glowful/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { Discounts } from "$store/loaders/Discounts/Discounts.ts";
import Slider from "deco-sites/glowful/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "deco-sites/glowful/sdk/useId.ts";
import SliderJS from "$store/islands/SliderJS.tsx";

export interface Props {
  product?: Product;
  discounts: Discounts;
}

export default function Subscriptions({ product, discounts }: Props) {
  const { quantityInstallments, quantityProduct, purchaseAvailable } = useUI();
  const [toggleSingle, setToggleSingle] = useState(false);
  const [toggleSubscription, setToggleSubscription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const id = useId();

  const discountsProduct = discounts.discounts;

  const priceInstallments = product?.offers?.lowPrice
    ? product?.offers?.lowPrice / quantityInstallments.value
    : null;

  const images = product?.isVariantOf?.image?.filter((img) =>
    img.alternateName?.toLowerCase().includes("unidade")
  );

  const quantityProductsActive = discountsProduct.filter(
    (discount) => discount.status === "ACTIVE"
  ).length;

  return (
    <div class="mt-[30px] mb-[20px] flex flex-col gap-[20px] ">
      <div class="w-full flex justify-between">
        <p class="pl-[15px] font-bold text-deep-beauty">Opções de compras:</p>

        <div class="flex items-end w-fit">
          <span class="text-[#999999] line-through leading-[20px]">
            {formatPrice(product?.offers?.highPrice)?.split(",")[0]},
          </span>
          <span class="text-[#999999] text-[10px] line-through">
            {formatPrice(product?.offers?.highPrice)?.split(",")[1]}
          </span>
        </div>
      </div>

      {/* SINGLE PURCHASE */}
      <div class="collapse grid-rows-[42px_0fr]  bg-[#E6E6E6] rounded-[20px]">
        <input
          class="h-[42px] cursor-pointer"
          type="radio"
          name="my-accordion-1"
          onClick={() => {
            purchaseAvailable.value = !toggleSingle;
            setToggleSingle(!toggleSingle);
            setToggleSubscription(false);
          }}
          checked={toggleSingle}
        />
        <div class="collapse-title flex justify-between rounded-full !px-[20px] !py-[10px] bg-[#F4F4F4] !h-[42px] !min-h-[42px]">
          <div class="flex gap-[4px] sm:gap-[10px] items-center">
            <input
              type="radio"
              checked={toggleSingle}
              name="radio-3"
              className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop"
            />

            <p class="text-[14px] sm:text-[16px]">Compra única</p>
          </div>

          <div class="flex gap-[8px] sm:gap-[14px] items-end">
            {quantityInstallments && priceInstallments && (
              <div class="flex items-end w-fit">
                <p class="text-deep-beauty text-[14px] leading-[20px]">
                  {quantityInstallments &&
                    priceInstallments &&
                    `${quantityInstallments}x de ${
                      formatPrice(priceInstallments)?.split(",")[0]
                    },`}
                </p>
                <p class="text-[10px]">
                  {formatPrice(priceInstallments)?.split(",")[1]}
                </p>
              </div>
            )}

            <div class="flex items-end w-fit">
              <span class="text-deep-beauty font-bold text-[16px] sm:text-[18px] leading-[20px]">
                {formatPrice(product?.offers?.lowPrice)?.split(",")[0]},
              </span>
              <span class="text-deep-beauty font-bold text-[10px]">
                {formatPrice(product?.offers?.lowPrice)?.split(",")[1]}
              </span>
            </div>
          </div>
        </div>

        <div class="collapse-content p-0">
          <div id={id} class="w-full grid  relative px-5">
            <Slider class="carousel carousel-end col-span-full gap-4 lg:gap-2.5 w-full">
              <Slider.PrevButton
                class={`absolute bottom-[60%] left-2 bg-cherry-pop rounded-full shadow-lg p-2 cursor-pointer z-50 ${
                  quantityProductsActive < 3 ? "hidden" : "block"
                } 
               ${quantityProductsActive === 3 && "xl:hidden"}`}
              >
                <Icon
                  size={18}
                  id="ChevronLeft"
                  strokeWidth={2}
                  class="text-white-lily"
                />
              </Slider.PrevButton>

              <Slider.NextButton
                class={`absolute bottom-[60%] right-2 z-10 bg-cherry-pop rounded-full shadow-lg p-2 cursor-pointer ${
                  quantityProductsActive < 3 ? "hidden" : "block"
                } ${quantityProductsActive === 3 && "xl:hidden"}`}
              >
                <Icon
                  size={18}
                  id="ChevronRight"
                  strokeWidth={2}
                  class="text-white-lily"
                />
              </Slider.NextButton>

              {discountsProduct
                .filter((discount) => discount.status === "ACTIVE")
                .map((discount, index) => (
                  <Slider.Item
                    index={index}
                    key={index}
                    class="carousel-item flex flex-col items-center gap-3 w-[120px] "
                  >
                    {images
                      ?.filter((img) =>
                        img.alternateName
                          ?.toLowerCase()
                          .includes(discount.minimumRequirement)
                      )
                      .map((img) => (
                        <img src={img.url} alt={img.alternateName} />
                      ))}
                    <p class="text-[14px] text-center h-full">{discount.title}</p>
                    <button
                      class="bg-white-lily rounded-[50px] px-[29px] py-1.5 text-cherry-pop text-[14px] hover:bg-cherry-pop hover:text-white-lily transition-all duration-200"
                      onClick={() =>
                        (quantityProduct.value = Number(
                          discount.minimumRequirement
                        ))
                      }
                    >
                      {discount.value * 100}% OFF
                    </button>
                  </Slider.Item>
                ))}
            </Slider>

            <SliderJS rootId={id} />
          </div>
        </div>
      </div>

      {/* SUBSCRIPTIONS */}
      <div class="collapse grid-rows-[42px_0fr]  bg-[#E6E6E6] rounded-[20px]">
        <input
          class="h-[42px]"
          type="radio"
          name="my-accordion-1"
          checked={toggleSubscription}
          onClick={() => {
            purchaseAvailable.value = !toggleSubscription;
            setToggleSubscription(!toggleSubscription);
            setToggleSingle(false);
          }}
        />
        <div class="collapse-title flex justify-between rounded-full !px-[20px] !py-[10px] bg-[#F4F4F4] !h-[42px] !min-h-[42px]">
          <div class="flex gap-[4px] sm:gap-[10px] items-center">
            <input
              type="radio"
              checked={toggleSubscription}
              name="radio-3"
              className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop"
            />

            <p class="text-[14px] sm:text-[16px]">Assine e economize até 20%</p>
          </div>

          <div class="flex items-end w-fit">
            <span class="text-deep-beauty font-bold text-[16px] sm:text-[18px] leading-[20px]">
              {formatPrice(product?.offers?.lowPrice)?.split(",")[0]},
            </span>
            <span class="text-deep-beauty font-bold text-[10px]">
              {formatPrice(product?.offers?.lowPrice)?.split(",")[1]}
            </span>
          </div>
        </div>

        <div class="collapse-content">
          <div class="!p-[20px] flex">
            <p>Lorem ipsum</p>
          </div>
        </div>

        <div>
          <p class="w-full text-center py-[14px] text-[12px] text-cherry-pop">
            Edite, pule ou cancele a qualquer momento!
          </p>
        </div>

        <div class="rounded-[20px] bg-[#F4F4F4] px-[8px] xl:px-[12px] grid grid-cols-3">
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px] border-r-[1px] border-[#BFBFBF]">
            <img src="/icons/hand.png" />
            <p class="text-[14px] text-deep-beauty text-center">
              Cancele quando quiser
            </p>
          </div>
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px] border-r-[1px] border-[#BFBFBF]">
            <img src="/icons/bus.png" />
            <p class="text-[14px] text-deep-beauty text-center max-w-[84px]">
              Entrega grátis
            </p>
          </div>
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px]">
            <img src="/icons/tag.png" />
            <p class="text-[14px] text-deep-beauty text-center">
              Melhor preço garantido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
