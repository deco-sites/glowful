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

  /**
   * @format color
   */
  backgroundColor?: string;

  backgroundImage?: boolean;
  image?: {
    /** @description Image for big screens */
    desktop?: ImageWidget;
    /** @description Image for small screens */
    mobile?: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function BannerAbout({
  subTitle,
  title,
  color,
  backgroundColor,
  backgroundImage,
  image,
}: Props) {
  return title && subTitle ? (
    <div class="relative flex" style={{ backgroundColor: backgroundColor }}>
      <div
        class={`container w-full max-w-[1300px]  flex flex-col justify-center items-center py-[60px] lg:py-[90px] lg:pt-32`}
      >
        <div
          class={`
           w-full px-[24px] text-start lg:text-center flex flex-col gap-[24px] lg:gap-[40px]`}
        >
          {subTitle && (
            <p class="text-base lg:text-[20px] text-cherry-pop font-bold leading-[20px] tracking-[1.6px]">
              {subTitle}
            </p>
          )}

          {title && (
            <div
              class="font-fraunces text-[28px] xl:text-[40px] tracking-[130%] leading-tight lg:tracking-normal"
              style={{ color: color ? color : "#FFF" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
        </div>
      </div>
      {backgroundImage && (
        <Picture preload class="absolute w-full h-full right-0 top-0">
          <Source
            src={image?.mobile ? image?.mobile : ""}
            width={360}
            height={461}
            media="(max-width: 767px)"
          />
          <Source
            src={image?.desktop ? image?.desktop : ""}
            width={1440}
            height={382}
            media="(min-width: 767px)"
          />
          <img
            class="w-full h-full object-cover"
            src={image?.desktop}
            alt={image?.alt}
            loading="eager"
          />
        </Picture>
      )}
    </div>
  ) : (
    backgroundImage && (
      <div class="relative flex w-full h-screen max-h-[380px] lg:max-h-[450px]">
        <Picture preload class="absolute w-full h-full right-0 top-0">
          <Source
            src={image?.mobile ? image?.mobile : ""}
            width={360}
            height={461}
            media="(max-width: 767px)"
          />
          <Source
            src={image?.desktop ? image?.desktop : ""}
            width={1440}
            height={382}
            media="(min-width: 767px)"
          />
          <img
            class="w-full h-full object-cover"
            src={image?.desktop}
            alt={image?.alt}
            loading="eager"
          />
        </Picture>
      </div>
    )
  );
}

export default BannerAbout;
