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
    <div class="lg:bg-[#F4F4F4]">
      <div class="lg:mr-[5%] card lg:card-side rounded grid justify-between gridBestSellers justify-items-center">
        <figure class="w-full lg:h-full h-[360px] relative lg:flex items-center justify-center">
          <img
            class="lg:block hidden w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image.desktop}
            alt={image.altText}
            decoding="async"
            loading="lazy"
          />
          <img
            class="block lg:hidden w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={image.mobile}
            alt={image.altText}
            decoding="async"
            loading="lazy"
          />
        </figure>

        <div class="py-[40px] lg:py-[80px] px-[24px] lg:px-0 flex flex-col items-start lg:row-start-1 lg:col-start-2 lg:max-w-[1300px]">
          {title && (
            <h3 class="pb-[40px] lg:pb-[60px] text-deep-beauty text-[24px] lg:text-[36px] uppercase tracking-[1.2px] font-bold text-left">
              {title}
            </h3>
          )}

          <Component {...props} />
        </div>
      </div>
    </div>
  );
}
