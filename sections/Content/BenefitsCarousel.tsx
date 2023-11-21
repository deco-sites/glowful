import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

export interface Props {
  benifits?: {
    icon: AvailableIcons;
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
          class={`md:hidden carousel carousel-center w-screen gap-6 text-center p-[20px]`}
          style={{ "background-color": background }}
        >
          {benifits.map((benifit, index) => (
            <Slider.Item
              index={index}
              class="carousel-item flex justify-center items-start gap-[8px] w-screen"
            >
              <Icon
                id={benifit?.icon}
                width={40}
                height={40}
                strokeWidth={0.01}
                fill={color}
              />
              <div class="flex flex-col items-start">
                <strong 
                  class={`text-sm flex justify-center items-center text-[${color}]`}
                  style={{ "color": color }}
                >
                  {benifit?.title}
                </strong>
                <span 
                  class={`text-sm flex justify-center items-center text-[${color}]`}
                  style={{ "color": color }}
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
      <div
        class={`hidden md:flex justify-center carousel carousel-center w-full gap-[50px] text-center p-[27px]`}
        style={{ "background-color": background }}
      >
        {benifits.map((benifit, index) => (
          <div class="carousel-item flex justify-center items-start gap-[8px] w-fit">
            <Icon
              id={benifit?.icon}
              width={40}
              height={40}
              strokeWidth={0.01}
              fill="currentColor"
            />
            <div class="flex flex-col items-start">
              <strong class={`text-sm flex justify-center items-center text-[${color}]`}>
                {benifit?.title}
              </strong>
              <span class={`text-sm flex justify-center items-center text-[${color}]`}>
                {benifit?.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
