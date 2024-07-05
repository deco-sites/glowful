import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface BannerCategory {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

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

function BannerCategory(props: SectionProps<ReturnType<typeof loader>>) {
  const bannerCategorys = props;

  if (!bannerCategorys.bannerCategory) {
    return null;
  }

  const { bannerCategory } = bannerCategorys;
  const { subTitle, title, color, imageIcon, image } = bannerCategory;

  return title && subTitle && imageIcon
    ? (
      <div class="relative flex">
        <div
          class={`container w-full max-w-[960px] flex flex-col lg:flex-row justify-center items-center gap-[40px] z-[1] py-[80px] lg:py-[120px]`}
        >
          <Image
            class="object-cover w-[130px] h-[130px] lg:h-[140px] lg:w-[140px]"
            width={140}
            height={140}
            src={imageIcon}
            alt={title}
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
                class="font-fraunces text-[20px] lg:text-[24px] font-light leading-[120%]"
                style={{ color: color ? color : "#FFF" }}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
          </div>
        </div>
        <Picture class="absolute w-full h-full right-0 top-0">
          <Source
            src={image.mobile}
            width={360}
            height={550}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={420}
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
        <Picture class="absolute w-full h-full right-0 top-0">
          <Source
            src={image.mobile}
            width={360}
            height={550}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={420}
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
    );
}
export interface Props {
  bannerCategorys?: BannerCategory[];
}

export const loader = (props: Props, req: Request) => {
  const { bannerCategorys } = { ...props };

  const bannerCategory = bannerCategorys?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { bannerCategory };
};

export default BannerCategory;
