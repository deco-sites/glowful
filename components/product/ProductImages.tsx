import { useState } from "preact/hooks";
import Image from "apps/website/components/Image.tsx";
import type { ImageObject } from "apps/commerce/types.ts";

export interface Props {
  images: ImageObject[] | undefined;
}

function ProductImages({ images }: Props) {
  const [displayedImages, setDisplayedImages] = useState(
    images?.slice(0, 4) ?? [],
  );

  const loadMoreImages = () => {
    const currentLength = displayedImages?.length || 0;
    const newImages = images?.slice(currentLength, currentLength + 2) ?? [];
    setDisplayedImages([...displayedImages, ...newImages]);
  };

  //console.log("PRODUTO", product);
  //console.log("PRODUTO", JSON.parse(product?.description));

  return (
    <div class="relative flex items-start gap-[50px] pt-[40px]">
      <div class="hidden w-full max-w-[512px] lg:flex flex-wrap gap-[24px]">
        {displayedImages?.map((img, index) => (
          <div class="max-w-[240px]">
            <Image
              class="w-full"
              sizes="(max-width: 640px) 100vw, 40vw"
              src={img.url!}
              alt={img.alternateName}
              width={300}
              height={300}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {displayedImages?.length < (images?.length ?? 0)
          ? <button onClick={loadMoreImages}>Carregar mais</button>
          : null}
      </div>
    </div>
  );
}

export default ProductImages;
