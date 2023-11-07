import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();
  const scrolled = signal(true);

  useEffect(() => {
    const handleScroll = () => {
      const offset = self.scrollY;
      if (offset > 50) {
        scrolled.value = true;
      } else {
        scrolled.value = false;
      }
    };

    self.addEventListener("scroll", handleScroll);
    return () => {
      self.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id={id} class={scrolled ? "" : "hidden"}>
      <Slider class="carousel carousel-center w-screen bg-deep-beauty gap-6 text-center p-[13px]">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span class="text-sm text-secondary-content flex justify-center items-center w-screen">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
