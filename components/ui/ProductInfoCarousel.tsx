import { useEffect, useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";

import { useId } from "$store/sdk/useId.ts";

interface Props {
  product: Product;
}

export default function ProductInfoCarousel({ product }: Props) {
  const { isVariantOf } = product;
  const images = isVariantOf?.image;
  const id = useId();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage();
      }
      if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Calculando o total de imagens
  const totalImages = images?.length;

  return (
    <>
      <div
        id={id}
        class="lg:hidden grid grid-flow-row sm:grid-flow-col relative w-full  self-center max-w-[320px]"
      >
        <Slider class="carousel carousel-center col-span-full row-span-full gap-0 w-full relative overflow-hidden ">
          {images?.length > 1 && currentImageIndex !== 0 && (
            <Slider.PrevButton
              onClick={handlePrevImage}
              class="absolute top-1/2 transform -translate-y-1/2 left-2 z-10 bg-[#fff] rounded-full shadow-lg p-2 cursor-pointer"
            >
              <Icon size={22} id="ChevronLeft" strokeWidth={2} />
            </Slider.PrevButton>
          )}
          {images?.length > 1 && currentImageIndex !== images?.length - 1 && (
            <Slider.NextButton
              onClick={handleNextImage}
              class="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 bg-[#fff] rounded-full shadow-lg p-2 cursor-pointer"
            >
              <Icon size={24} id="ChevronRight" strokeWidth={2} />
            </Slider.NextButton>
          )}
          {images?.map((image, index) => (
            <Slider.Item
              index={index}
              key={index}
              class={`${
                index === currentImageIndex ? "" : "hidden"
              } transition-opacity duration-300 carousel-item w-full`}
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 60vw"
                src={image.url!}
                alt={image.alt!}
                width={350}
                height={460}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>
        <div className="absolute bottom-4 right-4 bg-[#fff] rounded-full py-1 px-4 text-black font-bold">
          {currentImageIndex + 1}/{totalImages}
        </div>
      </div>
    </>
  );
}
