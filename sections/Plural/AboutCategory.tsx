import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import DescriptionAboutCategory from "$store/islands/DescriptionAboutCategory.tsx";
import type { SectionProps } from "deco/types.ts";
import { h } from "preact";

export interface AboutCategory {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;

  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
  };

  /**
   * @format html
   */
  title?: string;
  /**
   * @format html
   */
  descriptionOne: string;
  /**
   * @format html
   */
  descriptionTwo: string;
}

const DEFAULT_PROPS = {
  aboutCategorys: [
    {
      matcher: "/*",

      image: {
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },

      title: "Lorem",
    },
  ],
};

function AboutCategory(props: SectionProps<ReturnType<typeof loader>>) {
  const aboutCategorys = props;

  if (!aboutCategorys.aboutCategory) {
    return null;
  }

  if (aboutCategorys.isFiltered.toString() !== "") {
    return null;
  }

  const { aboutCategory } = aboutCategorys;
  const { title, descriptionOne, descriptionTwo, image } = aboutCategory;

  return (
    <div class="container max-w-full xl:max-w-[1240px] bg-[#F4f4f4] rounded flex flex-col lg:gap-[20px] xl:gap-[30px] pb-[40px] lg:pb-[40px] xl:pb-[60px] xl:pt-[30px]  xl:px-[60px] lg:my-[80px]">
      {title && (
        <div
          class="hidden lg:block pt-[32px] pb-[24px] textHighlightBannerCategory text-[24px] lg:text-[36px] text-center lg:text-start leading-[140%] font-fraunces tracking-[1.8px] font-semibold text-deep-beauty "
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      <div class="flex flex-col lg:flex-row  items-center justify-between lg:gap-[40px]">
        {image && (
          <figure class="relative w-fit max-h-[450px] ">
            <Picture preload>
              <Source
                src={image.mobile}
                width={360}
                height={360}
                media="(max-width: 767px)"
              />
              <Source
                src={image.desktop}
                width={350}
                height={425}
                media="(min-width: 767px)"
              />
              <img class="object-cover" src={image.desktop} alt={image?.alt} loading="lazy"/>
            </Picture>
          </figure>
        )}
        {title && (
          <div
            class="block lg:hidden pt-[32px] pb-[24px] px-[24px] lg:px-0 textHighlightBannerCategory text-[24px] lg:text-[36px] text-center lg:text-start leading-[140%] font-fraunces lg:tracking-[1.8px] font-semibold text-deep-beauty "
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}

        <DescriptionAboutCategory
          descriptionOne={descriptionOne}
          descriptionTwo={descriptionTwo}
        />
      </div>
    </div>
  );
}

export interface Props {
  aboutCategorys?: AboutCategory[];
}

export const loader = (props: Props, req: Request) => {
  const { aboutCategorys } = { ...DEFAULT_PROPS, ...props };

  const aboutCategory = aboutCategorys.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  const url = new URL(req.url);
  const isFiltered = new URLSearchParams(url.search);

  return { aboutCategory, isFiltered };
};

export default AboutCategory;
