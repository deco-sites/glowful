import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  benifits?: {
    icon: ImageWidget;
    title?: string;
    description?: string;
  }[];

  /**
   * @title Cor de fundo
   * @format color
   */
  background?: string;
  /**
   * @title Cor dos textos
   * @format color
   */
  color?: string;
}

export default function BenefitsCarouselAbout({
  benifits = [],
  background = "#F4F4F4",
  color = "#111",
}: Props) {
  const id = useId();

  return (
    <>
      {/* Mobile Carousel */}
      <div id={id} class="px-[24px] my-[32px] relative">
        <Slider.PrevButton class="flex lg:hidden w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 left-[16px] transform -translate-y-1/2 z-[3]">
          <Icon
            size={32}
            id="ChevronLeft"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.PrevButton>
        <Slider
          class={`lg:hidden  carousel carousel-center items-center w-full text-center px-[34px] gap-[34px]`}
          style={{ backgroundColor: background }}
        >
          {benifits.map((benifit, index) => (
            <Slider.Item
              index={index}
              class="carousel-item h-fit flex flex-col justify-center items-center gap-[20px] w-full py-[48px] "
            >
              <img
                src={benifit.icon}
                alt={benifit.icon || ""}
                className="object-cover max-w-[48px] max-h-[48px]"
              />
              <div class="flex flex-col items-center gap-[16px]">
                <strong
                  class={`text-[16px] font-bold text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.title}
                </strong>
                <span
                  class={`text-[16px] leading-[150%] text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.description}
                </span>
              </div>
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS rootId={id} />
        <Slider.NextButton class="flex lg:hidden w-[32px] h-[32px] lg:w-[50px] lg:h-[50px] min-h-[30px] btn btn-circle btn-outline bg-cherry-pop border-0 absolute top-1/2 right-[16px] transform -translate-y-1/2 z-[1] ">
          <Icon
            size={32}
            id="ChevronRight"
            strokeWidth={3}
            class="text-white-lily"
          />
        </Slider.NextButton>
      </div>

      {/* Desktop Flex */}
      <div
        class={`hidden lg:flex  py-[90px]`}
        style={{ backgroundColor: background }}
      >
        <div class="container flex flex-wrap justify-center gap-[40px] carousel carousel-center w-full text-center">
          {benifits.map((benifit) => (
            <div class="flex flex-col justify-center items-center gap-[24px] w-full max-w-[400px] xl:max-w-[330px]">
              <img
                src={benifit.icon}
                alt={benifit.icon || ""}
                className="object-cover max-w-[55px] max-h-[55px]"
              />
              <div class="flex flex-col items-center gap-[16px]">
                <strong
                  class={`text-[16px] font-bold text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.title}
                </strong>
                <span
                  class={`text-[16px] leading-[140%] text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
