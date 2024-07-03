import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "deco-sites/glowful/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";
import { Discounts } from "$store/loaders/Discounts/Discounts.ts";
import Slider from "deco-sites/glowful/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "deco-sites/glowful/sdk/useId.ts";
import SliderJS from "$store/islands/SliderJS.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  product?: Product;
  discounts: Discounts;
}

export default function Subscriptions({ product, discounts }: Props) {
  const { quantityInstallments, quantityProduct, purchaseAvailable } = useUI();
  const [toggleSingle, setToggleSingle] = useState(false);
  const [toggleSubscription, setToggleSubscription] = useState(false);
  const [toggleAnnualPlan, setToggleAnnualPlan] = useState(false);
  const [toggleWeekPlan, setToggleWeekPlan] = useState(false);
  const [handleDropdown, setHandleDropdown] = useState(false);
  const id = useId();

  const discountsProduct = discounts.discounts;

  const priceInstallments = product?.offers?.lowPrice
    ? product?.offers?.lowPrice / quantityInstallments.value
    : null;

  const images = product?.isVariantOf?.image?.filter((img) =>
    img.alternateName?.toLowerCase().includes("unidade")
  );

  const quantityProductsActive = discountsProduct.filter(
    (discount) => discount.status === "ACTIVE",
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
          id="handleSinglePurchase"
        />
        <label
          htmlFor="handleSinglePurchase"
          for="handleSinglePurchase"
          class="absolute w-[1px] h-[1px] p-0 m-[-1px] hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
        >
          Alterar dropdown compra unica
        </label>
        <div class="collapse-title flex justify-between rounded-full !px-[20px] !py-[10px] bg-[#F4F4F4] !h-[42px] !min-h-[42px]">
          <div class="flex gap-[4px] sm:gap-[10px] items-center">
            <input
              type="radio"
              checked={toggleSingle}
              name="radio-3"
              className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop"
              id="handleSinglePurchase2"
            />

            <label
              htmlFor="handleSinglePurchase2"
              for="handleSinglePurchase"
              class="absolute w-[1px] h-[1px] p-0 m-[-1px] hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
            >
              Alterar dropdown compra unica
            </label>

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
                    <button
                      class="bg-transparent"
                      onClick={() => (quantityProduct.value = Number(
                        discount.minimumRequirement,
                      ))}
                    >
                      {images
                        ?.filter((img) =>
                          img.alternateName
                            ?.toLowerCase()
                            .includes(discount.minimumRequirement)
                        )
                        .map((img) => (
                          <Image
                            src={img.url}
                            alt={img.alternateName}
                            height={150}
                            width={120}
                            loading="lazy"
                          />
                        ))}
                      <p class="text-[14px] text-center mt-3">
                        {discount.title}
                      </p>
                    </button>
                  </Slider.Item>
                  // <Slider.Item
                  //   index={index}
                  //   key={index}
                  //   class="carousel-item flex flex-col items-center gap-3 w-[120px] "
                  // >
                  //   {images
                  //     ?.filter((img) =>
                  //       img.alternateName
                  //         ?.toLowerCase()
                  //         .includes(discount.minimumRequirement)
                  //     )
                  //     .map((img) => (
                  //       <img src={img.url} alt={img.alternateName} />
                  //     ))}
                  //   <p class="text-[14px] text-center h-full">
                  //     {discount.title}
                  //   </p>
                  //   <button
                  //     class="bg-white-lily rounded-[50px] px-[29px] py-1.5 text-cherry-pop text-[14px] hover:bg-cherry-pop hover:text-white-lily transition-all duration-200"
                  //     onClick={() => (quantityProduct.value = Number(
                  //       discount.minimumRequirement,
                  //     ))}
                  //   >
                  //     {discount.value * 100}% OFF
                  //   </button>
                  // </Slider.Item>
                ))}
            </Slider>

            <SliderJS rootId={id} />
          </div>
        </div>
      </div>

      {/* SUBSCRIPTIONS */}
      <div class="collapse grid-rows-[42px_0fr]  bg-[#E6E6E6] rounded-[20px]">
        <input
          class="min-h-[42px] cursor-pointer"
          type="radio"
          name="my-accordion-1"
          checked={toggleSubscription}
          id="handleSubscription"
          onClick={() => {
            purchaseAvailable.value = !toggleSubscription;
            setToggleSubscription(!toggleSubscription);
            setToggleSingle(false);
          }}
        />
        <label
          htmlFor="handleSubscription"
          for="handleSubscription"
          class="absolute w-[1px] h-[1px] p-0 m-[-1px] hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
        >
          Alterna o menu lateral
        </label>
        <div class="collapse-title flex justify-between rounded-full !px-[20px] !py-[10px] bg-[#F4F4F4] !h-[42px] !min-h-[42px]">
          <div class="flex gap-[4px] sm:gap-[10px] items-center">
            <input
              type="radio"
              checked={toggleSubscription}
              name="radio-3"
              id="handleSubscription2"
              className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop cursor-pointer"
            />
            <label
              htmlFor="handleSubscription2"
              for="handleSubscription"
              class="absolute w-[1px] h-[1px] p-0 m-[-1px] hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0"
            >
              Alterna o menu lateral
            </label>

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

        <div>
          <p class="w-full text-center py-[14px] text-[12px] text-cherry-pop border-b border-[#D9D9D9]">
            Edite, pule ou cancele a qualquer momento!
          </p>
        </div>

        <div
          class={`collapse-content !p-0 ${
            toggleSubscription ? "row-start-3" : "row-start-1'"
          }`}
        >
          <div>
            <div class="px-6 lg:px-7 py-4 lg:py-9 flex flex-col lg:flex-row lg:gap-6 gap-5">
              <p class="lg:[writing-mode:vertical-lr] lg:rotate-180 border-b lg:border-b-0 lg:border-l border-[#707070] text-center lg:pb-0 lg:pl-2 pb-[5px]">
                Frequência
              </p>

              <div class="flex flex-col lg:gap-[30px] gap-5">
                <div class="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    checked={toggleAnnualPlan}
                    name="radio-4"
                    id="annualPlan"
                    className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop cursor-pointer"
                    onClick={() => {
                      setToggleAnnualPlan(!toggleAnnualPlan);
                      setToggleWeekPlan(false);
                    }}
                  />

                  <div class="flex gap-4 lg:gap-6 items-center">
                    <label for="annualPlan" class="block w-max cursor-pointer">
                      <p class="text-[14px] font-bold block w-max">
                        20% OFF
                      </p>
                      <span class="text-[14px] block w-max">
                        Plano anual
                      </span>
                    </label>

                    <p class="text-[12px] block w-full">
                      Pague em 12x e receba o ano todo. Entregas mensais
                      Renovado anualmente.
                    </p>
                  </div>
                </div>

                <div class="flex gap-2.5 items-center">
                  <input
                    type="radio"
                    checked={toggleWeekPlan}
                    name="radio-5"
                    id="weekPlan"
                    className="radio h-[18px] w-[18px] border-cherry-pop checked:bg-cherry-pop cursor-pointer"
                    onClick={() => {
                      setToggleWeekPlan(!toggleWeekPlan);
                      setToggleAnnualPlan(false);
                    }}
                  />

                  <label
                    for="weekPlan"
                    class="block w-max max-w-[100px] lg:max-w-full cursor-pointer"
                  >
                    <p class="text-[14px] font-bold block w-max">
                      15% OFF
                    </p>
                    <span class="text-[14px] block w-full">
                      Pagamento e entrega a cada:
                    </span>
                  </label>

                  <div class="relative w-fit">
                    <label class=" peer relative flex h-[26px] flex-row items-center justify-between bg-white-lily rounded-[50px] px-[14px] py-[8px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={handleDropdown}
                        name="todo[1]"
                        class="peer invisible"
                        onChange={() => setHandleDropdown(true)}
                      />

                      <span class="left-0 z-10 -ml-4 mr-[10px] w-full overflow-hidden text-nowrap before:absolute before:left-0 before:-z-10 before:h-5 before:w-7 before:bg-white text-[14px]">
                        30 dias
                      </span>

                      <div class="h-2 w-2 -rotate-45 border-l-2 border-b-2 border-red-500 duration-300 ease-in-out before:absolute before:bottom-0 before:h-2 before:w-2 before:bg-white peer-checked:rotate-[135deg]">
                      </div>
                    </label>

                    <div class="absolute top-full hidden w-full flex-col gap-[2px] bg-white-lily peer-has-[:checked]:flex">
                      <button
                        class="text-left font-bold h-full w-full bg-white-lily px-[12px] py-[6px] text-[#878787] hover:bg-[#CE0F69] hover:text-white-lily text-[14px]"
                        onClick={() => {
                          setHandleDropdown(false);
                        }}
                      >
                        15 dias
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="w-full text-center py-[14px] text-[12px] text-cherry-pop border-t border-[#D9D9D9]">
              Dúvidas sobre assinaturas?{" "}
              <a href="/assinaturas" class="font-semibold underline">
                Saiba mais.
              </a>
            </p>
          </div>
        </div>

        <div class="rounded-[20px] bg-[#F4F4F4] px-[8px] xl:px-[12px] grid grid-cols-3">
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px] border-r-[1px] border-[#BFBFBF]">
            <img src="/icons/hand.png" alt="" />
            <p class="text-[14px] text-deep-beauty text-center">
              Cancele quando quiser
            </p>
          </div>
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px] border-r-[1px] border-[#BFBFBF]">
            <img src="/icons/bus.png" alt="" />
            <p class="text-[14px] text-deep-beauty text-center max-w-[84px]">
              Entrega grátis
            </p>
          </div>
          <div class="flex flex-col items-center gap-[12px] p-[16px] xl:p-[20px]">
            <img src="/icons/tag.png" alt="" />
            <p class="text-[14px] text-deep-beauty text-center">
              Melhor preço garantido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
