import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  subTitle?: string;
  /**
   * @format html
   */
  title?: string;
  /**
   * @format color
   */
  color: string;

  imageIcon: ImageWidget;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function BannerCategory({ subTitle, title, color, imageIcon, image }: Props) {
  return title && subTitle && imageIcon ? (
    <div class="relative flex">
      <div
        class={`container w-full max-w-[960px] flex flex-col lg:flex-row justify-center items-center gap-[40px] z-[1] py-[100px] lg:py-[140px]`}
      >
        <img
          class="object-cover w-[130px] h-[130px] lg:h-[140px] lg:w-[140px]"
          sizes="(max-width: 640px) 100vw, 30vw"
          src={imageIcon}
          alt=""
          decoding="async"
          loading="lazy"
        />

        <div
          class={`
           w-full px-[24px] text-center lg:text-start flex flex-col gap-[20px]`}
        >
          {subTitle && (
            <p
              style={{ color: color ? color : "#FFF" }}
              class="text-[20px] lg:text-[18px] leading-[20px] tracking-[2px]"
            >
              {subTitle}
            </p>
          )}

          {title && (
            <div
              class="font-fraunces text-[20px] lg:text-[30px] font-light leading-[130%]"
              style={{ color: color ? color : "#FFF" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>
      </div>
      <Picture preload class="absolute w-full h-full right-0 top-0">
        <Source
          src={image.mobile}
          width={360}
          height={461}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={382}
          media="(min-width: 767px)"
        />
        <img
          class="w-full h-full object-cover"
          src={image.desktop}
          alt={image?.alt}
        />
      </Picture>
    </div>
  ) : (
    <div class="relative flex w-full h-screen max-h-[380px] lg:max-h-[450px]">
      <Picture preload class="absolute w-full h-full right-0 top-0">
        <Source
          src={image.mobile}
          width={360}
          height={461}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={382}
          media="(min-width: 767px)"
        />
        <img
          class="w-full h-full object-cover"
          src={image.desktop}
          alt={image?.alt}
        />
      </Picture>
    </div>
  );
}

export default BannerCategory;
