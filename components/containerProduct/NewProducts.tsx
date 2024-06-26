import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Section } from "deco/blocks/section.ts";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop: ImageWidget;
    altText: string;
  };

  title: string;

  products: Section;
}

export default function NewProducts({
  image,
  title,
  products: { Component, props },
}: Props) {
  return (
    <div class="bg-[#F4F4F4]">
      <div class="flex flex-col lg:flex-row">
        <Picture class="w-full lg:w-[35%] 2xl:w-[36%] lg:h-full h-[360px] relative lg:flex items-center justify-center">
          <Source
            src={image.mobile}
            width={360}
            height={360}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={500}
            height={900}
            media="(min-width: 767px)"
          />
          <img
            class="w-full h-full lg:h-[calc(31.2vw*(876/522))] lg:max-h-[640px] 2xl:max-h-[820px] object-cover"
            src={image.desktop}
            alt={image.altText ?? title}
            loading="lazy"
          />
        </Picture>

        <div class="newsProductsFlex py-[60px] lg:p-0 lg:justify-center lg:mx-auto px-6 lg:px-0 flex flex-col items-center xl:items-start xl:row-start-1 xl:col-start-2 xl:max-w-[1300px]">
          {title && (
            <h2 class="pb-10 lg:pb-2.5 xl:pb-8 2xl:pb-[60px] text-deep-beauty text-2xl lg:clampTitleSection uppercase tracking-[1.2px] font-bold text-left">
              {title}
            </h2>
          )}

          <Component {...props} />
        </div>
      </div>
    </div>
  );
}
