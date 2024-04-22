import { Section } from "deco/blocks/section.ts";

export interface Props {
  title: string;
  products: Section;
}

export default function ProductRelated({
  products: { Component, props },
  title,
}: Props) {
  return (
    <div
      class={`w-full container px-[24px] max-w-[1240px] flex flex-col gap-[32px] items-start lg:p-0 z-[-1] relative`}
    >
      {title && (
        <h2 class="font-bold text-[24px] xl:text-[30px] leading-[31px] text-center lg:text-start tracking-[5%]">
          {title}
        </h2>
      )}
      <Component {...props} />
    </div>
  );
}
