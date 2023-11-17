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
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function BannerSubscriber({ title, description, link, color, image }: Props) {
  return (
    <div class="relative flex">
      <div class="container w-full flex justify-center lg:justify-start items-center z-[1] py-[48px] lg:py-[40px]">
        <div class="max-w-[568px] px-[24px] text-center flex flex-col items-center gap-[46px] lg:gap-[30px]">
          {title && (
            <div
              class="card-title text-[44px] font-semibold leading-[130%] textWithStrong"
              style={{ color: color ? color : "#FFF" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          <p style={{ color: color ? color : "#FFF" }}>{description}</p>

          <div class="card-actions justify-center lg:justify-start">
            {link && (
              <a
                class="btn bg-transparent text-sm font-normal tracking-[1px] px-[50px]"
                style={{
                  color: color ? color : "#FFF",
                  borderColor: color ? color : "#FFF",
                }}
                href={link?.href}
              >
                {link?.text}
              </a>
            )}
          </div>
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
  );
}

export default BannerSubscriber;
