import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import type { ImageObject } from "apps/commerce/types.ts";
import ButtonMore from "../ui/ButtonMore.tsx";

export interface Props {
  images: ImageObject[] | undefined;
}

function ProductImages({ images }: Props) {
  const [displayedImages, setDisplayedImages] = useState(
    images?.slice(0, 4) ?? []
  );

  const loadMoreImages = () => {
    const currentLength = displayedImages?.length || 0;
    const newImages = images?.slice(currentLength, currentLength + 2) ?? [];
    setDisplayedImages([...displayedImages, ...newImages]);
    // Scroll to the newly added images
    const lastImageElement = document.getElementById(
      "image-" + (displayedImages.length - 1)
    );
    if (lastImageElement) {
      lastImageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadLessImages = () => {
    setDisplayedImages(images?.slice(0, 4) ?? []);
    // Scroll to the top of the image container
    const imageContainer = document.getElementById("image-container");
    if (imageContainer) {
      imageContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div class="relative flex flex-col items-center justify-end pt-[40px]">
      <div
        class="hidden w-full lg:flex flex-wrap gap-[20px]"
        id="image-container"
      >
        {displayedImages?.map((img, index) => (
          <div class="xl:w-[360px] xl:h-[450px] lg:w-[260px] lg:h-[310px]">
            <Image
              id={`image-${index}`}
              class="w-full h-full object-cover"
              sizes="(max-width: 640px) 100vw, 40vw"
              src={img.url!}
              alt={img.alternateName}
              width={360}
              height={450}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
      {displayedImages?.length < (images?.length ?? 0) && (
        <div class="translate-y-[-20px]">
          <ButtonMore
            onClick={loadMoreImages}
            textHover="Carregar mais"
            type="more"
          />
        </div>
      )}
      {displayedImages?.length > 4 &&
        displayedImages?.length === (images?.length ?? 0) && (
          <div class="translate-y-[-20px]">
            <ButtonMore
              onClick={loadLessImages}
              textHover="Carregar menos"
              type="less"
            />
          </div>
        )}
    </div>
  );
}

export default ProductImages;
