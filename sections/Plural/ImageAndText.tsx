import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import DescriptionReadMore from "$store/islands/DescriptionReadMore.tsx";

export interface Props {
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  text?: string;
  title?: string;
  /**
   * @format html
   */
  description: string;
  link?: {
    text?: string;
    href?: string;
    /**
     * @format color
     */
    color?: string;
  };
  oneColumn?: boolean;
  styles?: {
    invertImage?: boolean;
  };
}

export default function ImageAndText(props: Props) {
  const { link, text, title, description, image, styles, oneColumn } = {
    ...props,
  };

  return (
    <div class="container ">
      <div
        class={`lg:py-[90px] lg:card lg:card-side rounded flex justify-between flex-col ${
          styles?.invertImage ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <figure class={`relative w-full lg:w-fit block h-fit`}>
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={image?.mobile}
              width={360}
              height={360}
            />
            <Source
              media="(min-width: 768px)"
              src={image?.desktop ? image?.desktop : image?.mobile}
              width={630}
              height={450}
            />
            <img
              class="w-full object-cover max-w-[670px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={image?.mobile}
              alt={image?.altText}
              decoding="async"
              loading="lazy"
            />
          </Picture>
        </figure>
        <div class={`card-body p-0 gap-0 w-full max-w-[550px] px-[24px] py-[40px] lg:py-0 ${
          styles?.invertImage ? "xl:pr-16 xl:pl-0" : "xl:pl-16 xl:pr-0"
        }`}>
          <span class={`pb-[24px] lg:pb-[40px] lg:text-[20px] font-bold tracking-[1.20px] lg:tracking-[1.6px] text-cherry-pop ${
          styles?.invertImage ? "" : "hidden lg:flex"}`}>
            {text}
          </span>
          <h2 class={`card-title font-fraunces font-medium text-[28px] lg:text-[40px] pb-[32px] lg:pb-[24px] leading-[130%] ${
          styles?.invertImage ? "" : "hidden lg:flex"}
          `}>
            {title}
          </h2>
          {oneColumn ? (
            <div
              class="text-[16px] leading-[150%] text-deep-beauty linkReadMore"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <DescriptionReadMore description={description} />
          )}
        </div>
      </div>
    </div>
  );
}
