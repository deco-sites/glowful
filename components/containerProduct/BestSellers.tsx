import { Section } from "deco/blocks/section.ts";

export interface Props {
  title: string;
  subTitle: {
    text: string;
    url: string;
  };

  products: Section;
}

export default function BestSellers({
  title,
  subTitle,
  products: { Component, props },
}: Props) {
  return (
    <div class="container py-[64px] lg:py-[80px] flex flex-col gap-[32px] lg:gap-[60px]">
      {title && subTitle && title && (
        <div class="px-[32px] lg:px-0 flex flex-col items-center gap-[8px] lg:flex-row lg:gap-[24px]">
          <h3 class="text-deep-beauty text-[24px] lg:text-[36px] uppercase tracking-[1.2px] font-bold text-left">
            {title}
          </h3>
          <a
            href={subTitle.url}
            class="text-[#878787] text-[16px] lg:text-[22px] font-semibold lg:text-center"
          >
            {subTitle.text}
          </a>
        </div>
      )}

      <Component {...props} />
    </div>
  );
}
