import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @format html
   */
  title?: string;
  description?: string;
  link?: {
    text: string;
    href: string;
  };
  /**
   * @format color
   */
  color: string;
  layoutCenter?: boolean;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function PluralBanner({
  title,
  description,
  link,
  color,
  image,
  layoutCenter,
}: Props) {
  return title && description
    ? (
      <div class="relative flex">
        <div
          class={`${
            layoutCenter ? "lg:justify-center" : "lg:justify-start"
          } container w-full flex justify-center items-center  z-[1] pt-[63px] pb-[240px] lg:py-[70px] lg:max-h-[28rem]`}
        >
          <div
            class={`${
              layoutCenter ? "lg:max-w-[600px]" : "lg:max-w-[390px]"
            } w-full px-6 text-end lg:text-center flex flex-col items-end lg:items-start`}
          >
            {title && (
              <h2
                class="card-title text-[32px] lg:text-[40px] font-semibold leading-[130%] textWithStrong lg:text-left"
                style={{ color: color ? color : "#FFF" }}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}

            {description && (
              <p
                style={{ color: color ? color : "#FFF" }}
                class="text-2xl leading-[130%] mt-6 lg:mt-[38px] mb-8 lg:mb-[60px] lg:text-left"
              >
                {description}
              </p>
            )}

            <div class="card-actions justify-center lg:justify-start">
              {link && (
                <a
                  style={{
                    backgroundColor: color ? color : "#FFF",
                  }}
                  class="px-10 lg:py-2.5 lg:px-10 2xl:px-[60px] py-4 2xl:py-[18px] rounded-full border-none text-[#000000] text-base 2xl:text-[20px] font-bold uppercase tracking-[1px] hover:!bg-cherry-pop hover:text-white-lily hover:border-none transition-all duration-300 "
                  href={link?.href}
                >
                  {link?.text}
                </a>
              )}
            </div>
          </div>
        </div>
        <Picture class="absolute w-full h-full right-0 top-0">
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
            loading="lazy"
          />
        </Picture>
      </div>
    )
    : (
      <div class="relative flex w-full h-screen max-h-[380px] lg:max-h-[450px]">
        <a href={link?.href}>
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
              loading="lazy"
            />
          </Picture>
        </a>
      </div>
    );
}

export default PluralBanner;
