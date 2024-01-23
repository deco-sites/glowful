import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import DescriptionAboutCategory from "$store/islands/DescriptionAboutCategory.tsx";

export interface Props {
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

export default function ImageAndIcons(props: Props) {
  const { title, descriptionOne, descriptionTwo, image } = {
    ...props,
  };

  return (
    <div class="container bg-[#F4f4f4] rounded flex flex-col lg:gap-[60px] pb-[60px] lg:px-[60px] lg:my-[60px]">
      {title && (
        <div
          class="hidden lg:block pt-[32px] pb-[24px] textHighlightBannerCategory text-[24px] lg:text-[36px] text-center lg:text-start leading-[140%] font-fraunces tracking-[1.8px] font-semibold text-deep-beauty "
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      <div class="flex flex-col lg:flex-row gap-[60px] items-center justify-between">
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
            <img class="object-cover" src={image.desktop} alt={image?.alt} />
          </Picture>
        </figure>

        {title && (
          <div
            class="block lg:hidden pt-[32px] pb-[24px] textHighlightBannerCategory text-[24px] lg:text-[36px] text-center lg:text-start leading-[140%] font-fraunces tracking-[1.8px] font-semibold text-deep-beauty "
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
