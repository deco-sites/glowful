import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useEffect } from "preact/hooks";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  alerts?: {
    alert: string;
    /** @format color */
    background?: string;
    /** @format color */
    color?: string;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  const { displayTop } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      const offset = self.scrollY;
      if (offset > 1) {
        displayTop.value = false;
      } else {
        displayTop.value = true;
      }
    };

    self.addEventListener("scroll", handleScroll);
    return () => {
      self.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id={id} class={displayTop.value ? "" : "hidden"}>
      {alerts.map((alert, index) => (
        <Slider
          class="carousel carousel-center w-full bg-deep-beauty gap-6 text-center p-[14px] lg:p-[16px] 2xl:p-[18px]"
          style={{ "background-color": alert.background }}
        >
          <Slider.Item index={index} class="carousel-item w-full">
            <span
              class={`text-[12px] text-[${alert.color}] flex justify-center items-center w-full`}
            >
              {alert.alert}
            </span>
          </Slider.Item>
        </Slider>
      ))}

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
