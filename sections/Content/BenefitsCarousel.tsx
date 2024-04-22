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
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
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

export default function BenefitsCarousel({
  benifits = [],
  interval = 5,
  background = "#F4F4F4",
  color = "#111",
}: Props) {
  const id = useId();

  return (
    <>
      {/* Mobile Carousel */}
      <div id={id}>
        <Slider
          class={`lg:hidden carousel carousel-center w-screen gap-6 text-center py-[16px] px-[8px]`}
          style={{ "background-color": background }}
        >
          {benifits.map((benifit, index) => (
            <Slider.Item
              index={index}
              class="carousel-item flex justify-center items-center gap-[16px] w-screen"
            >
              <img
                src={benifit.icon}
                alt={benifit.icon || ""}
                className="object-cover max-w-[40px] max-h-[40px] lg:max-w-[30px] lg:max-h-[30px] 2xl:max-w-[40px] 2xl:max-h-[40px]"
                loading="lazy"
              />
              <div class="flex flex-col items-start">
                <strong
                  class={`text-lg lg:text-base 2xl:text-lg flex justify-center items-center text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.title}
                </strong>
                <span
                  class={`text-base lg:text-xs 2xl:text-base tracking-[0.8] uppercase flex justify-center items-center text-[${color}]`}
                  style={{ color: color }}
                >
                  {benifit?.description}
                </span>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} interval={interval && interval * 1e3} />
      </div>

      {/* Desktop Flex */}
      <div class={`hidden lg:flex `} style={{ "background-color": background }}>
        <div class="lg:w-[95%] lg:px-[51px] lg:mx-auto xl:max-w-[1408px] justify-between carousel carousel-center w-full text-center px-[20px] py-[32px] ml-[10%] lg:ml-auto">
          {benifits.map((benifit) => (
            <div class="carousel-item flex justify-center items-center gap-[16px] w-fit">
              <img
                src={benifit.icon}
                alt={benifit.icon || ""}
                className="object-cover max-w-[40px] max-h-[40px]"
                loading="lazy"
              />
              <div class="flex flex-col items-start">
                <strong
                  class={`text-[18px] leading-[120%] tracking-[0.9] flex justify-center font-bold items-center text-[${color}]`}
                >
                  {benifit?.title}
                </strong>
                <span
                  class={`text-sm lg:text-xs xl:text-sm leading-[120%] tracking-[0.8] uppercase flex justify-center items-center text-[${color}]`}
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
