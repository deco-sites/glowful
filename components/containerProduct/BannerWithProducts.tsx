import { Section } from "deco/blocks/section.ts";

export interface Props {
  products: Section;
}

export default function BannerWithProducts({
  products: { Component, props },
}: Props) {
  return (
    <div class="container py-[64px] lg:py-[80px] flex flex-col lg:flex-row lg:gap-[40px] xl:px-[5rem] lg:px-8 2xl:px-0">
      <Component {...props} />
    </div>
  );
}
