import { Section } from "deco/blocks/section.ts";

export interface Props {
  products: Section;
}

export default function BannerWithProducts({
  products: { Component, props },
}: Props) {
  return (
    <div class="container py-[60px] lg:pt-12 lg:pb-16 2xl:py-[90px] flex flex-col lg:flex-row lg:gap-[40px] xl:px-[5rem] lg:px-8 2xl:px-0">
      <Component {...props} />
    </div>
  );
}
