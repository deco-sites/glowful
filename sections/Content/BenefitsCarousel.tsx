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
}

export default function BenefitsCarousel({
  benifits = [],
  interval = 5,
}: Props) {
  const id = useId();

  return (
    <>
      {/* Mobile Carousel */}
      <div id={id}>
        <Slider class="md:hidden carousel carousel-center w-screen bg-[#F4F4F4] gap-6 text-center p-[20px]">
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
                fill="currentColor"
              />
              <div class="flex flex-col items-start">
                <strong class="text-deep-beauty text-sm flex justify-center items-center">
                  {benifit?.title}
                </strong>
                <span class="text-deep-beauty text-sm flex justify-center items-center">
                  {benifit?.description}
                </span>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} interval={interval && interval * 1e3} />
      </div>

      {/* Desktop Flex */}
      <div class="hidden md:flex justify-center carousel carousel-center w-full bg-[#F4F4F4] gap-[50px] text-center p-[27px]">
        {benifits.map((benifit, index) => (
          <div
            class="carousel-item flex justify-center items-start gap-[8px] w-fit"
          >
            <Icon
              id={benifit?.icon}
              width={40}
              height={40}
              strokeWidth={0.01}
              fill="currentColor"
            />
            <div class="flex flex-col items-start">
              <strong class="text-deep-beauty text-sm flex justify-center items-center">
                {benifit?.title}
              </strong>
              <span class="text-deep-beauty text-sm flex justify-center items-center">
                {benifit?.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
